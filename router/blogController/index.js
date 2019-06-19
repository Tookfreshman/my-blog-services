const Router = require('koa-router')
const blogController = require('./blogController')
const queryBlogs = require('./queryBlogs')

const router = new Router()

router.use('/articles', blogController.routes())
router.use('/articles', queryBlogs.routes())

module.exports = router
