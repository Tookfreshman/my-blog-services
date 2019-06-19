const Router = require('koa-router')
const Blogs = require('../../models/blogs')
const ctxHelper = require('../../utils/ctxHelper')
const router = new Router()

router.post('/publishBlog', async (ctx, next) => {
  const req = ctx.request.body
  const blogModel = Object.assign(req)
  let res = {
    code: '-1',
    data: null,
    msg: ''
  }
  if (!req.title) {
    res.msg = '文章标题不能为空'
  } else if (!req.articleType) {
    res.msg = '文章类型不能为空'
  } else if (!req.article) {
    res.msg = '文章内容不能为空'
  } else if (!req.author) {
    res.msg = '文章作者不能为空'
  } else if (!req.desc) {
    res.msg = '文章摘要不能为空'
  } else {
    try {
      res = await saveBlogs(blogModel)
    } catch (err) {
      console.log(err)
      ctxHelper(ctx, {
        code: '-999',
        data: null,
        msg: 'System Error'
      })
    }
  }
  ctxHelper(ctx, res)
})

function saveBlogs(data) {
  return new Promise((resolve, reject) => {
    const blogs = new Blogs(data)
    blogs.save(err => {
      if (err) {
        return reject(err)
      }
      let res = {
        code: '0',
        data: null,
        msg: '发布成功'
      }
      return resolve(res)
    })
  })
}
module.exports = router
