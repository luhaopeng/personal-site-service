const Koa = require('koa')
const BodyParser = require('koa-bodyparser')
const router = require('./router/blog-router')

const app = new Koa()

app.use(BodyParser())
app.use(router.routes())

app.listen(3000)
