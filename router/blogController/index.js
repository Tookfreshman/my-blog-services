const Router = require('koa-router')
const publishBlog = require('./publishBlog')
const queryBlogs = require('./queryBlogs')

const router = new Router()

router.use('/articles', publishBlog.routes())
router.use('/articles', queryBlogs.routes())

module.exports = router
