const Koa = require('koa')
const BodyParser = require('koa-bodyparser')
const blogRouter = require('./router/blog')
const authRouter = require('./router/auth')
const cors = require('@koa/cors')

const app = new Koa()

app.use(
    cors({
        origin: 'http://localhost:8000'
    })
)
app.use(BodyParser())
app.use(authRouter.routes())
app.use(blogRouter.routes())

app.listen(3000)
