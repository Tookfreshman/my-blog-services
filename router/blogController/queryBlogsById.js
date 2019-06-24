const Router = require('koa-router')
const Blogs = require('../../models/blogs')
const ctxHelper = require('../../utils/ctxHelper')
const router = new Router()

router.get('/source-open/queryBlogsById', async (ctx, next) => {
  const req = ctx.request.query
  try {
    let res = await Blogs.findById({ _id: req.id })
    ctxHelper(ctx, {
      code: '0',
      data: res,
      msg: '查询成功'
    })
  } catch (err) {
    console.log(err)
    throwError(ctx)
  }
})

router.post('/source-open/querySomeoneBlogsByUserId', async (ctx, next) => {
  const { userId, pageSize, pageNum } = ctx.request.body
  if (!pageSize || !pageNum || pageSize < 1 || pageNum < 0) {
    parameterError(ctx)
    return
  }
  try {
    let res = await Blogs.find({ userId })
      .skip(pageSize * (pageNum - 1))
      .limit(pageSize)
    ctxHelper(ctx, {
      code: '0',
      data: res,
      msg: '查询成功'
    })
  } catch (err) {
    console.log(err)
    throwError(ctx)
  }
})

module.exports = router
