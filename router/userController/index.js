const Router = require('koa-router')
const router = new Router()
const userInfoIsExistence = require('./userInfoIsExistence')
const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const getCurrentUser = require('./getCurrentUser')
const getUserBrief = require('./getUserBrief')

router.use('/user-provider', userInfoIsExistence.routes())
router.use('/user-provider', register.routes())
router.use('/user-provider', login.routes())
router.use('/user-provider', logout.routes())
router.use('/user-provider', getCurrentUser.routes())
router.use('/user-provider', getUserBrief.routes())

module.exports = router
