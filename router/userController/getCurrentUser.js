const Router = require('koa-router')
const UserInfo = require('../../models/userInfo.js')
const UserBrief = require('../../models/userBrief.js')
const ctxHelper = require('../../utils/ctxHelper')
const router = new Router()

router.get('/getCurrentUser', async ctx => {
  let sess = ctx.session.sssid
  let userId = sess.split('-')[5]
  try {
    let [result] = await UserInfo.find({ userId }, { _id: 0 })
    if (!result) {
      ctxHelper(ctx, {
        code: '-1',
        data: null,
        msg: 'Systems Error'
      })
    } else {
      let data = {
        ...result._doc
      }
      delete data.password
      let [data1] = await UserBrief.find({ userId }, { _id: 0 })
      if (data1) {
        data = {
          ...data,
          ...data1._doc
        }
      }
      ctxHelper(ctx, {
        code: '0',
        data: data,
        msg: null
      })
    }
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
