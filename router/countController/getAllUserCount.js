const Router = require('koa-router')
const UserInfo = require('../../models/userInfo.js')
const ctxHelper = require('../../utils/ctxHelper')
const router = new Router()

router.get('/source-open/getAllUserCount', async (ctx, next) => {
  try {
    await UserInfo.countDocuments({}, (err, result) => {
      if (err) {
        console.log(err)
        throwError(ctx)
      }
      ctxHelper(ctx, {
        code: '0',
        data: result,
        msg: '查询成功'
      })
    })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
