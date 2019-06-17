const Router = require('koa-router')
const getAllIndustrys = require('./getAllIndustrys')
const getAllProvinceAndCitys = require('./getAllProvinceAndCitys')

const router = new Router()

router.use('/config-provider', getAllIndustrys.routes())
router.use('/config-provider', getAllProvinceAndCitys.routes())

module.exports = router
