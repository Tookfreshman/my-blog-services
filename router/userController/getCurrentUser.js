const Router = require('koa-router')
const UserInfo = require('../../models/userInfo.js')
const ctxHelper = require('../../utils/ctxHelper')
const router = new Router()

router.get('/source-open/getCurrentUser', async (ctx, next) => {
  let sess = ctx.session.sssid
  if (sess) {
    let id = sess.split('-')[5]
    try {
      await UserInfo.find({ _id: id }, (err, result) => {
        if (err) {
          ctxHelper(ctx, {
            code: '-1',
            data: null,
            msg: 'Systems Error'
          })
          return
        }
        if (result.length === 0) {
          ctxHelper(ctx, {
            code: '-1',
            data: null,
            msg: 'Systems Error'
          })
        } else {
          let data = result[0]
          delete data.password
          ctxHelper(ctx, {
            code: '0',
            data: data,
            msg: null
          })
        }
      })
    } catch (err) {
      console.log(err)
    }
  } else {
    ctxHelper(ctx, {
      code: '401',
      data: null,
      msg: '未登录'
    })
  }
})

module.exports = router
