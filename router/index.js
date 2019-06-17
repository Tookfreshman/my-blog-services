const Router = require('koa-router')
const router = new Router()
const userController = require('./userController')
const countController = require('./countController')
const uploadController = require('./uploadController')
const configController = require('./configController')

router.use(userController.routes())
router.use(countController.routes())
router.use(uploadController.routes())
router.use(configController.routes())

module.exports = router
