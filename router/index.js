const Router = require('koa-router')
const router = new Router()
const userController = require('./userController')
const countController = require('./countController')
const uploadController = require('./uploadController')
const configController = require('./configController')
const blogController = require('./blogController')
const authenticationController = require('./authenticationController')

router.use(userController.routes())
router.use(countController.routes())
router.use(uploadController.routes())
router.use(configController.routes())
router.use(blogController.routes())
router.use(authenticationController.routes())

module.exports = router
