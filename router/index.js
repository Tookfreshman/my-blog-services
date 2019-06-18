const Router = require('koa-router')
const router = new Router()
const userController = require('./userController')
const countController = require('./countController')
const blogController = require('./blogController')

router.use(userController.routes())
router.use(countController.routes())
router.use(blogController.routes())

module.exports = router
