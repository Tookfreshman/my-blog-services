const Router = require('koa-router')
const ctxHelper = require('../../utils/ctxHelper')
const Blogs = require('../../models/blogs.js')
const router = new Router()

router.get('/source-open/getRecentlyBlogs', async ctx => {
  let res
  try {
    res = await Blogs.find({}, { _id: 0 })
      .sort({ publishTime: -1 })
      .limit(10)
  } catch (err) {
    console.log(err)
    throwError()
  }
  ctxHelper(ctx, {
    code: '0',
    data: res,
    msg: '查询成功'
  })
})

module.exports = router
