const Router = require('koa-router')
const UserBrief = require('../../models/userBrief.js')
const ctxHelper = require('../../utils/ctxHelper')
const router = new Router()

router.post('/uploadUserSetting', async ctx => {
  let data = ctx.request.body
  let result = await UserBrief.findOneAndUpdate({ userId: data.userId }, data, {
    upsert: true,
    new: true
  })
  if (result) {
    ctxHelper(ctx, {
      code: '0',
      data: null,
      msg: '保存成功'
    })
  }
})
module.exports = router
