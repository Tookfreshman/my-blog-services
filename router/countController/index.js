const Router = require('koa-router')
const getAllUserCount = require('./getAllUserCount')

const router = new Router()

router.use('/count', getAllUserCount.routes())

module.exports = router
