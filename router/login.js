const Router = require('koa-router')
const UserInfo = require('../models/userInfo.js')
const router = new Router()
const userInfoIsExist = require('../dbMethods/userInfoIsExist')
const ctxHelper = require('../utils/ctxHelper')

router.post('/source-open/register', async(ctx, next) {
  const req = ctx.request.body
  try {
    UserInfo.find(req.userName, (err, result) => {
      if(err) {
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
      }else {
        console.log(result)
      }
    })
  }catch(err) {
    console.log(err);
  }
})