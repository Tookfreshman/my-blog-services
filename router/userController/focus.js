const Router = require('koa-router')
const ctxHelper = require('../../utils/ctxHelper')
const router = new Router()
const Focus = require('../../models/focus.js')

// 关注某人
router.patch('/focusSomeone', async ctx => {
  try {
    let data = ctx.request.body
    let userId = ctx.session.sssid.split('-')[5]
    let [res1, res2] = await Promise.all([
      Focus.findOneAndUpdate(
        { userId },
        { $addToSet: { focus: data.focus }, $inc: { focusNum: 1 } },
        { upsert: true, new: true }
      ),
      Focus.findOneAndUpdate(
        { userId: data.focus },
        { $addToSet: { fans: userId }, $inc: { fansNum: 1 } },
        { upsert: true, new: true }
      )
    ])
    if (res1 && res2) {
      ctxHelper(ctx, {
        code: '0',
        data: null,
        msg: '关注成功'
      })
    }
  } catch (err) {
    console.log(err)
    throwError(ctx)
  }
})

// 取消关注某人
router.patch('/unfocusSomeone', async ctx => {
  try {
    let data = ctx.request.body
    let userId = ctx.session.sssid.split('-')[5]
    let [res1, res2] = await Promise.all([
      Focus.findOneAndUpdate(
        { userId },
        { $pull: { focus: data.focus }, $inc: { focusNum: -1 } },
        { upsert: true, new: true }
      ),
      Focus.findOneAndUpdate(
        { userId: data.focus },
        { $pull: { fans: userId }, $inc: { fansNum: -1 } },
        { upsert: true, new: true }
      )
    ])
    if (res1 && res2) {
      ctxHelper(ctx, {
        code: '0',
        data: null,
        msg: '取消关注成功'
      })
    }
  } catch (err) {
    console.log(err)
    throwError(ctx)
  }
})

// 查询是否关注某人
router.get('/isFocusSomeone', async ctx => {
  try {
    let targetUserId = ctx.query.targetUserId
    let userId = ctx.session.sssid.split('-')[5]
    let res = await Focus.find({ userId, focus: targetUserId })
    let data = false
    if (res.length > 0) {
      data = true
      msg = '已关注'
    } else {
      data = false
      msg = '未关注'
    }
    ctxHelper(ctx, {
      code: '0',
      data: data,
      msg: msg
    })
  } catch (err) {
    console.log(err)
    throwError(ctx)
  }
})

// 根据userId查询当前用户的粉丝和关注的人
router.get('/source-open/findFansAndFocusByuserId', async ctx => {
  try {
    let userId = ctx.query.userId
    let res = await Focus.findOne({ userId }, { focus: 0, fans: 0 })
    if (res) {
      ctxHelper(ctx, {
        code: '0',
        data: res,
        msg: '查询成功'
      })
    } else {
      let data = {
        fansNum: 0,
        focusNum: 0
      }
      ctxHelper(ctx, {
        code: '0',
        data: data,
        msg: '查询成功'
      })
    }
  } catch (err) {
    console.log(err)
    throwError(ctx)
  }
})

module.exports = router
