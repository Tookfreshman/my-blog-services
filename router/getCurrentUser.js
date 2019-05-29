const Router = require('koa-router')
const UserInfo = require('../models/userInfo.js')
const router = new Router()
const ctxHelper = require('../utils/ctxHelper')

router.get('/source-open/getCurrentUser', async (ctx, next) => {
  console.log(ctx.session.sssid)
})

module.exports = router
