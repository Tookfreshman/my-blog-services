const Router = require('koa-router')
const router = new Router()
const userInfoIsExistence = require('./userInfoIsExistence')
const register = require('./register')

router.use('/user-provider', userInfoIsExistence.routes())
router.use('/user-provider', register.routes())

module.exports = router
