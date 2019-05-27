const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const initDb = require('./mongo')
const router = require('./router')

//连接mongoDb数据库
initDb()

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(9527)
