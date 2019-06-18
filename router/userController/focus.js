const Router = require('koa-router')
const ctxHelper = require('../../utils/ctxHelper')
const router = new Router()
const Focus = require('../../models/focus.js')

// 关注某人
router.patch('/focusSomeone', async ctx => {
  try {
    let data = ctx.request.body
    let userId = ctx.session.sssid.split('-')[5]
    let res = await Focus.findOneAndUpdate(
      { userId },
      { $addToSet: { focus: data.focus } },
      { upsert: true, new: true }
    )
    if (res) {
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
    let res = await Focus.findOneAndUpdate(
      { userId },
      { $pull: { focus: data.focus } },
      { upsert: true, new: true }
    )
    console.log(res)
    if (res) {
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
    let [res] = await Focus.aggregate([
      { $match: { userId } },
      {
        $project: {
          fansNum: { $size: { $ifNull: ['$fans', []] } },
          focusNum: { $size: { $ifNull: ['$focus', []] } },
          _id: 0
        }
      }
    ])
    ctxHelper(ctx, {
      code: '0',
      data: res,
      msg: '查询成功'
    })
  } catch (err) {
    console.log(err)
    throwError(ctx)
  }
})

module.exports = router
