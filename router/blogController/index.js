const Router = require('koa-router')
const blogController = require('./blogController')
const queryBlogs = require('./queryBlogs')
const queryBlogsById = require('./queryBlogsById')

const router = new Router()

router.use('/articles', blogController.routes())
router.use('/articles', queryBlogs.routes())
router.use('/articles', queryBlogsById.routes())

module.exports = router
