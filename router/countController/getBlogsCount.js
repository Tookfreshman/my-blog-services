const Router = require('koa-router')
const Blogs = require('../../models/blogs.js')
const ctxHelper = require('../../utils/ctxHelper')
const router = new Router()

router.get('/source-open/getBlogsCount', async (ctx, next) => {
  try {
    let result = await Blogs.countDocuments({})
    ctxHelper(ctx, {
      code: '0',
      data: result,
      msg: '查询成功'
    })
  } catch (err) {
    console.log(err)
    throwError(ctx)
  }
})

module.exports = router
