const Router = require('koa-router')
const UserBrief = require('../../models/userBrief.js')
const Authentication = require('../../models/authentication.js')
const ctxHelper = require('../../utils/ctxHelper')
const router = new Router()

router.post('/uploadUserSetting', async ctx => {
  let data = ctx.request.body
  const nickName = data.nickName
  const isNew = data.isNew
  if (nickName) {
    let res = await UserBrief.find({ nickName })
    // 判断是否是新增，是新增需要验证昵称是否重复
    if (res.length > 0 && isNew) {
      ctxHelper(ctx, {
        code: '-1',
        data: null,
        msg: '昵称已被使用'
      })
    } else {
      let isNew = data.isNew
      delete data.isNew
      let result = await UserBrief.findOneAndUpdate(
        { userId: data.userId },
        data,
        {
          upsert: true,
          new: true
        }
      )
      if (result && isNew) {
        let authenticationResult = await Authentication.update(
          { userId: data.userId },
          { $set: { authentication: 1 } },
          { upsert: true, new: true }
        )
        let sess = ctx.session.sssid
        let needAuthentication = sess.split('-')[6]
        if (needAuthentication === 'true') {
          let s = ctx.session.sssid.split('-')
          s[6] = false
          ctx.session.sssid = s.join('-')
        }
      }
      if (result) {
        ctxHelper(ctx, {
          code: '0',
          data: null,
          msg: '保存成功'
        })
      } else {
        throwError(ctx)
      }
    }
  } else {
    parameterError(ctx)
  }
})
module.exports = router
