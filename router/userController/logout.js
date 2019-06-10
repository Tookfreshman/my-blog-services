const Router = require('koa-router')
const ctxHelper = require('../../utils/ctxHelper')

const router = new Router()

router.post('/source-open/logout', (ctx, next) => {
  ctxHelper(ctx, {
    code: '0',
    data: null,
    msg: '登出成功'
  })
  ctx.cookies.set('sssid', null)
  ctx.cookies.set('sssid.sig', null)
})

module.exports = router
