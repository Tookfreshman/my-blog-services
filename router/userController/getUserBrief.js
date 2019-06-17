const Router = require('koa-router')
const UserBrief = require('../../models/userBrief.js')
const ctxHelper = require('../../utils/ctxHelper')
const router = new Router()

router.get('/getUserBrief', async ctx => {
  let sess = ctx.session.sssid
  if (sess) {
    try {
      let userId = sess.split('-')[5]
      let [result] = await UserBrief.find({ userId })
      if (result) {
        ctxHelper(ctx, {
          code: '0',
          data: result,
          msg: '查询成功'
        })
      } else {
        const userBrief = new UserBrief({ userId })
        let res = await userBrief.save()
        ctxHelper(ctx, {
          code: '0',
          data: res,
          msg: '查询成功'
        })
      }
    } catch (err) {
      throwError(ctx)
      console.log(error)
    }
  } else {
    needLogin(ctx)
  }
})

module.exports = router
