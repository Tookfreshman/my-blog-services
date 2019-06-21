const Router = require('koa-router')
const UserBrief = require('../../models/userBrief.js')
const ctxHelper = require('../../utils/ctxHelper')
const router = new Router()

router.post('/uploadUserSetting', async ctx => {
  let data = ctx.request.body
  const nickName = data.nickName
  if (nickName) {
    let res = await UserBrief.find({ nickName })
    if (res.length > 0) {
      ctxHelper(ctx, {
        code: '-1',
        data: null,
        msg: '昵称已被使用'
      })
    } else {
      let result = await UserBrief.findOneAndUpdate(
        { userId: data.userId },
        data,
        {
          upsert: true,
          new: true
        }
      )
      if (result) {
        let sess = ctx.session.sssid
        let needAuthentication = sess.split('-')[6]
        if (needAuthentication) {
          let s = ctx.session.sssid.split('-')
          s[6] = false
          ctx.session.sssid = s.join('-')
        }
        ctxHelper(ctx, {
          code: '0',
          data: null,
          msg: '保存成功'
        })
      }
    }
  } else {
    parameterError(ctx)
  }
})
module.exports = router
