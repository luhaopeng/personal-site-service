const Koa = require('koa')
const BodyParser = require('koa-bodyparser')
const blogRouter = require('./router/blog')
const authRouter = require('./router/auth')
const cors = require('@koa/cors')
const responseHandler = require('./middlewares/responseHandler')

const app = new Koa()

app.use(
    cors({
        origin: 'http://localhost:8000'
    })
)
app.use(BodyParser())
app.use(responseHandler())
app.use(authRouter.routes())
app.use(blogRouter.routes())

app.listen(3000)
