const Router = require('koa-router')
const Authentication = require('../../models/authentication.js')
const ctxHelper = require('../../utils/ctxHelper')
const router = new Router()

router.get('/getAuthentication', async ctx => {
  try {
    let sess = ctx.session.sssid
    let userId = sess.split('-')[5]
    let res = await Authentication.findOne(
      { userId },
      { _id: 0, authentication: 1 }
    )
    if (!res) {
      res = {
        authentication: 0
      }
    }
    ctxHelper(ctx, {
      code: '0',
      data: res,
      msg: '查询成功'
    })
  } catch (err) {
    throwError(ctx)
    console.log(err)
  }
})

module.exports = router
