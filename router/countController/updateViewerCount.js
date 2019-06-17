const Router = require('koa-router')
const ctxHelper = require('../../utils/ctxHelper')
const router = new Router()
const ViewerCount = require('../../models/viewerCount.js')
const generateUUID = require('../../utils/generateUUID')

router.post('/source-open/updateViewerCount', async ctx => {
  let cookies = ctx.cookies.get('viewerFlag')
  try {
    let result = await ViewerCount.findOneAndUpdate(
      { name: 'viewerCount' },
      { $inc: { count: 1 } },
      { upsert: true, new: false }
    )
    if (!result) {
      // 设置cookies，标志用户是否第一次浏览网站（浏览的用户量）
      ctx.cookies.set(
        'viewerFlag',
        generateUUID(), //可替换为token
        {
          domain: 'localhost', // 写cookie所在的域名
          path: '/', // 写cookie所在的路径
          httpOnly: true, // 是否只用于http请求中获取
          overwrite: true // 是否允许重写
        }
      )
    }
    ctxHelper(ctx, {
      code: '0',
      data: null,
      msg: '记录成功'
    })
  } catch (err) {
    console.log(err)
    throwError(ctx)
  }
})

module.exports = router
