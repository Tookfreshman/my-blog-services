const Router = require('koa-router')
const router = new Router()
const userController = require('./userController')
const countController = require('./countController')

router.use(userController.routes())
router.use(countController.routes())

module.exports = router
