global.throwError = function(ctx) {
  ctx.body = {
    code: '-999',
    data: null,
    msg: 'System Error'
  }
}
