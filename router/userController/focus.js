const Router = require('koa-router')
const ctxHelper = require('../../utils/ctxHelper')
const router = new Router()
const Focus = require('../../models/focus.js')
const UserBrief = require('../../models/userBrief.js')

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
router.get('/source-open/findFansAndFocusByUserId', async ctx => {
  try {
    let userId = ctx.query.userId
    let res = await Focus.findOne(
      { userId },
      { fansNum: 1, focusNum: 1, _id: 0 }
    )
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

// 根据userId查询当前用户的所有关注信息
router.get('/findFocusDataByUserId', async ctx => {
  try {
    let userId = ctx.query.userId
    let res = await Focus.findOne({ userId }, { userId: 0, _id: 0 })
    // 如果这时候关注信息还为空的话
    if (!res) {
      let data = {
        fansList: [],
        focusList: [],
        fansNum: 0,
        focusNum: 0
      }
      ctxHelper(ctx, {
        code: '0',
        data: data,
        msg: '查询成功'
      })
      return
    }
    let data = {
      ...res._doc
    }
    if (data.fans.length > 0) {
      try {
        let fansList = await UserBrief.find(
          { userId: { $in: data.fans } },
          { portraitUrl: 1, nickName: 1, userName: 1, userId: 1, _id: 0 }
        )
        data.fansList = fansList
      } catch (err) {
        console.log(err)
        throwError(ctx)
        return
      }
    } else {
      data.fansList = []
    }
    if (data.focus.length > 0) {
      try {
        let focusList = await UserBrief.find(
          { userId: { $in: data.focus } },
          { portraitUrl: 1, nickName: 1, userName: 1, userId: 1, _id: 0 }
        )
        data.focusList = focusList
      } catch (err) {
        console.log(err)
        throwError(ctx)
        return
      }
    } else {
      data.focusList = []
    }
    delete data.fans
    delete data.focus
    ctxHelper(ctx, {
      code: '0',
      data: data,
      msg: '查询成功'
    })
  } catch (err) {
    console.log(err)
    throwError(ctx)
  }
})

module.exports = router
