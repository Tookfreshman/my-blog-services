global.throwError = function(ctx) {
  ctx.body = {
    code: '-999',
    data: null,
    msg: 'System Error'
  }
}

global.needLogin = function(ctx) {
  ctx.body = {
    code: '401',
    data: null,
    msg: '未登录'
  }
}
