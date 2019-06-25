const Router = require('koa-router')
const UserInfo = require('../../models/userInfo.js')
const UserBrief = require('../../models/userBrief.js')
const Authentication = require('../../models/authentication.js')
const ctxHelper = require('../../utils/ctxHelper')
const router = new Router()

router.get('/getCurrentUser', async ctx => {
  let sess = ctx.session.sssid
  let userId = sess.split('-')[5]
  try {
    let [result] = await UserInfo.find({ userId }, { _id: 0, password: 0 })
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
      let data1 = await UserBrief.findOne({ userId }, { _id: 0 })
      let data2 = await Authentication.findOne(
        { userId },
        { _id: 0, authentication: 1 }
      )
      if (!data2) {
        data2 = {
          authentication: 0
        }
      } else {
        data2 = data2._doc
      }
      if (data1) {
        data = {
          ...data,
          ...data1._doc,
          ...data2
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
