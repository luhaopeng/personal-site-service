const Koa = require('koa')
const BodyParser = require('koa-bodyparser')
const router = require('./router/blog-router')
const cors = require('@koa/cors')

const app = new Koa()

app.use(cors({
    origin: 'http://localhost:8000'
}))
app.use(BodyParser())
app.use(router.routes())

app.listen(3000)
