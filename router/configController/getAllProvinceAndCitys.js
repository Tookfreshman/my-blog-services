const Router = require('koa-router')
const ProvinceAndCity = require('../../models/provinceAndCity.js')
const ctxHelper = require('../../utils/ctxHelper')
const router = new Router()

router.get('/source-open/getAllProvinceAndCitys', async ctx => {
  try {
    let res = await ProvinceAndCity.find({})
    ctxHelper(ctx, {
      code: '0',
      data: res,
      msg: '查询成功'
    })
  } catch (err) {
    throwError()
    console.log(err)
  }
})

module.exports = router
