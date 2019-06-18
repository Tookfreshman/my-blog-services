const Router = require('koa-router')
const blogController = require('./blogController')

const router = new Router()

router.use('/articles', blogController.routes())

module.exports = router
