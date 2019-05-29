const Router = require('koa-router')
const UserInfo = require('../models/userInfo.js')
const router = new Router()
const ctxHelper = require('../utils/ctxHelper')
const generateUUID = require('../utils/generateUUID')

router.post('/source-open/login', async (ctx, next) => {
  const req = ctx.request.body
  try {
    await UserInfo.find({ userName: req.userName }, (err, result) => {
      if (err) {
        ctxHelper(ctx, {
          code: '-1',
          data: null,
          msg: 'Systems Error'
        })
        return
      }
      if (result.length === 0) {
        ctxHelper(ctx, {
          code: '-1',
          data: null,
          msg: '用户名或密码错误'
        })
      } else {
        if (result[0].password !== req.password) {
          ctxHelper(ctx, {
            code: '-1',
            data: null,
            msg: '用户名或密码错误'
          })
        } else {
          ctxHelper(ctx, {
            code: '0',
            data: result[0],
            msg: '登录成功'
          })
          ctx.session.sssid = generateUUID()
        }
      }
    })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
