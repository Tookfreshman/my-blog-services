const Router = require('koa-router')
const UserBrief = require('../../models/userBrief.js')
const ctxHelper = require('../../utils/ctxHelper')
const router = new Router()

router.get('/source-open/getUserBriefByUserId', async ctx => {
  try {
    let userId = ctx.query.userId
    let [res] = await UserBrief.find({ userId })
    if (res) {
      ctxHelper(ctx, {
        code: '0',
        data: res,
        msg: '查询成功'
      })
    } else {
      const userBrief = new UserBrief({ userId })
      let res = await userBrief.save()
      ctxHelper(ctx, {
        code: '0',
        data: res,
        msg: '查询成功'
      })
    }
  } catch (err) {
    console.log(err)
    throwError(ctx)
  }
})

module.exports = router
