const Router = require('koa-router')
const UserInfo = require('../../models/userInfo.js')
const UserBrief = require('../../models/userBrief.js')
const router = new Router()
const ctxHelper = require('../../utils/ctxHelper')
const generateUUID = require('../../utils/generateUUID')
const decrypt = require('../../utils/decrypt')

router.post('/source-open/login', async (ctx, next) => {
  const req = ctx.request.body
  try {
    let [result] = await UserInfo.find({ userName: req.userName }, { _id: 0 })
    if (!result) {
      ctxHelper(ctx, {
        code: '-1',
        data: null,
        msg: '用户名或密码错误'
      })
    } else {
      let password = decrypt(req.password, req.pt)
      let needAuthentication = true
      if (result.password !== password) {
        ctxHelper(ctx, {
          code: '-1',
          data: null,
          msg: '用户名或密码错误'
        })
      } else {
        try {
          let [data] = await UserBrief.find(
            { userId: result.userId },
            { _id: 0 }
          )
          if (data) {
            data = {
              ...result._doc,
              ...data._doc
            }
            if (data.nickName) {
              needAuthentication = false
            }
          } else {
            data = {
              ...result._doc
            }
          }
          delete data.password
          ctxHelper(ctx, {
            code: '0',
            data: data,
            msg: '登录成功'
          })
        } catch (err) {
          console.log(err)
        }

        ctx.session.sssid =
          generateUUID() + '-' + result.userId + '-' + needAuthentication
      }
    }
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
