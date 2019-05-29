const Router = require('koa-router')
const router = new Router()
const userInfoIsExistence = require('./userInfoIsExistence')
const register = require('./register')
const login = require('./login')
const getCurrentUser = require('./getCurrentUser')

router.use('/user-provider', userInfoIsExistence.routes())
router.use('/user-provider', register.routes())
router.use('/user-provider', login.routes())
router.use('/user-provider', getCurrentUser.routes())

module.exports = router
