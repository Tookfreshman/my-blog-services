const Router = require('koa-router')
const Blogs = require('../../models/blogs')
const ctxHelper = require('../../utils/ctxHelper')
const router = new Router()

router.post('/source-open/addBlogsViewer', async ctx => {
  const { id } = ctx.request.body
  if (!id) {
    parameterError(ctx)
    return
  }
  try {
    let res = await Blogs.findOneAndUpdate(
      { _id: id },
      { $inc: { viewerCount: 1 } },
      { upsert: true, new: true }
    )
    let msg
    if (res) {
      msg = '浏览数增加成功'
    } else {
      msg = '浏览数增加失败'
    }
    ctxHelper(ctx, {
      code: '0',
      data: null,
      msg
    })
  } catch (err) {
    console.log(err)
    throwError(ctx)
  }
})

module.exports = router
