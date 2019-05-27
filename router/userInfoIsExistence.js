const Router = require('koa-router')
const router = new Router()
const userInfoIsExist = require('../dbMethods/userInfoIsExist')
const ctxHelper = require('../utils/ctxHelper')

router.get('/source-open/userInfoIsExistence', async (ctx, next) => {
  const req = ctx.request.query
  let isExist = false
  if (req.userName) {
    isExist = await userInfoIsExist(req.userName)
  }
  let res
  if (isExist) {
    res = {
      code: '-1',
      data: null,
      msg: '用户名已被注册'
    }
  } else {
    res = {
      code: '0',
      data: null,
      msg: '用户名可用'
    }
  }
  ctxHelper(ctx, res)
})

module.exports = router
