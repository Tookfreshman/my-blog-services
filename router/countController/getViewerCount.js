const Router = require('koa-router')
const ctxHelper = require('../../utils/ctxHelper')
const router = new Router()
const ViewerCount = require('../../models/viewerCount.js')
router.get('/source-open/getViewerCount', async ctx => {
  try {
    let [result] = await ViewerCount.find({ name: 'viewerCount' })
    ctxHelper(ctx, {
      code: '0',
      data: result.count,
      msg: '查询成功'
    })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
