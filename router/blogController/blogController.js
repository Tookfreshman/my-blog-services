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
  if (req.title.length === 0) {
    res.msg = '文章标题不能为空'
  } else if (req.articleType.length === 0) {
    res.msg = '文章标题不能为空'
  } else if (req.article.length === 7) {
    res.msg = '文章内容不能为空'
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
  console.log(req)
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
        msg: '操作成功'
      }
      return resolve(res)
    })
  })
}
module.exports = router
