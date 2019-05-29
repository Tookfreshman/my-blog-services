const Router = require('koa-router')
const UserInfo = require('../models/userInfo.js')
const router = new Router()
const userInfoIsExist = require('../dbMethods/userInfoIsExist')
const ctxHelper = require('../utils/ctxHelper')

router.post('/source-open/register', async (ctx, next) => {
  const req = ctx.request.body
  const userModel = Object.assign(req, { registerTime: new Date() })
  let isExist = await userInfoIsExist(userModel.userName)
  if (isExist) {
    ctxHelper(ctx, {
      code: '-1',
      data: null,
      msg: '用户名已被注册'
    })
  } else {
    try {
      let res = await saveAccount(userModel)
      ctxHelper(ctx, res)
    } catch (err) {
      console.log(err)
      ctxHelper(ctx, {
        code: '-999',
        data: null,
        msg: 'System Error'
      })
    }
  }
})

function saveAccount(data) {
  return new Promise((resolve, reject) => {
    const userInfo = new UserInfo(data)
    userInfo.save(err => {
      if (err) {
        return reject(err)
      }
      let res = {
        code: '0',
        data: null,
        msg: '注册成功'
      }
      return resolve(res)
    })
  })
}

module.exports = router
