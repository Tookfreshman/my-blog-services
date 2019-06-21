const Router = require('koa-router')
const publishBlog = require('./publishBlog')
const queryBlogs = require('./queryBlogs')
const queryBlogsById = require('./queryBlogsById')

const router = new Router()

router.use('/articles', publishBlog.routes())
router.use('/articles', queryBlogs.routes())
router.use('/articles', queryBlogsById.routes())

module.exports = router
