const Router = require('koa-router')
const publishBlog = require('./publishBlog')
const queryBlogs = require('./queryBlogs')
const queryBlogsById = require('./queryBlogsById')
const addBlogsViewer = require('./addBlogsViewer')

const router = new Router()

router.use('/articles', publishBlog.routes())
router.use('/articles', queryBlogs.routes())
router.use('/articles', queryBlogsById.routes())
router.use('/articles', addBlogsViewer.routes())

module.exports = router
