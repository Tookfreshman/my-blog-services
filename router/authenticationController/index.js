const Router = require('koa-router')
const authentication = require('./authentication')

const router = new Router()

router.use('/authentication-provider', authentication.routes())

module.exports = router
