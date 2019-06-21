const Router = require('koa-router')
const getAllUserCount = require('./getAllUserCount')
const updateViewerCount = require('./updateViewerCount')
const getViewerCount = require('./getViewerCount')
const getBlogsCount = require('./getBlogsCount')

const router = new Router()

router.use('/count', getAllUserCount.routes())
router.use('/count', updateViewerCount.routes())
router.use('/count', getViewerCount.routes())
router.use('/count', getBlogsCount.routes())

module.exports = router
