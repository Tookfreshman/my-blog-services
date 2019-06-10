const Router = require('koa-router')
const UserInfo = require('../../models/userInfo.js')
const router = new Router()
const ctxHelper = require('../../utils/ctxHelper')
const generateUUID = require('../../utils/generateUUID')
const decrypt = require('../../utils/decrypt')

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
        let password = decrypt(req.password, req.pt)
        if (result[0].password !== password) {
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
          ctx.session.sssid = generateUUID() + '-' + result[0]._id
        }
      }
    })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
