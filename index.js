const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const initDb = require('./mongo')
const router = require('./router')
const session = require('koa-session')
const ctxHelper = require('./utils/ctxHelper')
require('./utils/globalMethods')

app.keys = ['abasdnfksandfsdakjfnkjasdnfjkasndgjhesfbgfg']

const CONFIG = {
  key: 'sssid', //cookie key (default is koa:sess)
  maxAge: 30 * 60 * 1000, // cookie的过期时间 maxAge in ms (default is 1 days)
  overwrite: true, //是否可以overwrite    (默认default true)
  httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
  signed: true, //签名默认true
  rolling: false, //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
  renew: false //(boolean) renew session when session is nearly expired,
}

app.use(session(CONFIG, app))

//连接mongoDb数据库
initDb()

app.use(bodyParser())

app.use(async (ctx, next) => {
  if (ctx.request.url.indexOf('/source-open') === -1 && !ctx.session.sssid) {
    needLogin(ctx)
  } else {
    await next()
  }
})
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(9527)
