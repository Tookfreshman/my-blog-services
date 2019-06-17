const Router = require('koa-router')
const router = new Router()
const uploadUserSetting = require('./uploadUserSetting')

router.use('/upload-provider', uploadUserSetting.routes())

module.exports = router
