const Router = require('koa-router')
const ctxHelper = require('../../utils/ctxHelper')
const router = new Router()

router.post('/source-open/addBlogsViewer', async ctx => {
  const { id } = ctx.request.query
  console.log(id)
})

module.exports = router
