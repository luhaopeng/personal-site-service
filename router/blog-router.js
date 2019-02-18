const router = require('koa-router')()
const Blog = require('../db/blog')

router.get('/', async (ctx, next) => {
    await next()
    ctx.body = 'Hello World!'
})

router.get('/blog/:id', async (ctx, next) => {
    await next()
    await Blog.findByIdAndUpdate(ctx.params.id, { $inc: { read: 1 } })
        .exec()
        .then(doc => {
            ctx.response.status = 200
            ctx.response.body = { doc }
        })
        .catch(err => {
            ctx.response.status = 400
            ctx.response.body = { msg: err.errmsg }
        })
})

router.post('/blog', async (ctx, next) => {
    await next()
    let blog = new Blog(ctx.request.body)
    await blog
        .save()
        .then(() => {
            ctx.response.status = 200
        })
        .catch(err => {
            ctx.response.status = 400
            ctx.response.body = { msg: err.errmsg }
        })
})

router.put('/blog/:id', async (ctx, next) => {
    await next()
    await Blog.findByIdAndUpdate(ctx.params.id, {
        update: Date.now(),
        ...ctx.request.body
    })
        .exec()
        .then(() => {
            ctx.response.status = 200
        })
        .catch(err => {
            ctx.response.status = 400
            ctx.response.body = { msg: err.errmsg }
        })
})

router.del('/blog/:id', async (ctx, next) => {
    await next()
    await Blog.findByIdAndDelete(ctx.params.id)
        .exec()
        .then(() => {
            ctx.response.status = 200
        })
        .catch(err => {
            ctx.response.status = 400
            ctx.response.body = { msg: err.errmsg }
        })
})

module.exports = router
