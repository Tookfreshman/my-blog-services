const Router = require('koa-router')
const Industry = require('../../models/industry.js')
const ctxHelper = require('../../utils/ctxHelper')
const router = new Router()

router.get('/source-open/getAllIndustrys', async ctx => {
  try {
    let res = await Industry.find({})
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
