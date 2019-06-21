const Router = require('koa-router')
const router = new Router()
const UserBrief = require('../../models/userBrief.js')
const ctxHelper = require('../../utils/ctxHelper')

router.get('/source-open/nickNameIsExistence', async (ctx, next) => {
  const nickName = ctx.request.query.nickName
  if (nickName) {
    let result = await UserBrief.find({ nickName })
    if (result.length > 0) {
      ctxHelper(ctx, {
        code: '-1',
        data: null,
        msg: '昵称已被使用'
      })
    } else {
      ctxHelper(ctx, {
        code: '0',
        data: null,
        msg: '昵称可用'
      })
    }
  } else {
    parameterError(ctx)
  }
})

module.exports = router
