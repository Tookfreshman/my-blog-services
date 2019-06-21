const Router = require('koa-router')
const Blogs = require('../../models/blogs')
const ctxHelper = require('../../utils/ctxHelper')
const router = new Router()

router.get('/source-open/queryBlogsById', async (ctx, next) => {
  const req = ctx.request.query
  let res
  try {
    res = await Blogs.findById({ _id: req.id })
  } catch (err) {
    console.log(err)
    throwError(ctx)
  }
  ctxHelper(ctx, {
    code: '0',
    data: res,
    msg: '查询成功'
  })
})

module.exports = router
