const Koa = require('koa')
const BodyParser = require('koa-bodyparser')
const blogRouter = require('./router/blog')
const authRouter = require('./router/auth')
const cors = require('@koa/cors')
const responseHandler = require('./middlewares/responseHandler')

const app = new Koa()

app.use(
    cors({
        origin: (ctx) => {
            const validDomains = ['http://localhost:8000']
            if (validDomains.indexOf(ctx.request.header.origin) !== -1) {
                return ctx.request.header.origin
            }
            return validDomains[0]
        }
    })
)
app.use(BodyParser())
app.use(responseHandler())
app.use(authRouter.routes())
app.use(blogRouter.routes())

app.listen(3000)
