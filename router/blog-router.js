const router = require('koa-router')()
const Blog = require('../db/blog')

router.get('/', async (ctx, next) => {
    await next()
    ctx.body = 'Hello World!'
})

router.get('/blog/:id', async (ctx, next) => {
    await next()
    await Blog.findOne({ _id: ctx.params.id })
        .exec()
        .then(doc => {
            ctx.response.status = 200
            ctx.response.body = { doc }
        })
        .catch(err => {
            ctx.response.status = 500
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
            ctx.response.status = 500
            ctx.response.body = { msg: err.errmsg }
        })
})

router.put('/blog/:id', async (ctx, next) => {
    await next()
    await Blog.updateOne({ _id: ctx.params.id }, ctx.request.body)
        .exec()
        .then(() => {
            ctx.response.status = 200
        })
        .catch(err => {
            ctx.response.status = 500
            ctx.response.body = { msg: err.errmsg }
        })
})

router.del('/blog/:id', async (ctx, next) => {
    await next()
    await Blog.deleteOne({ _id: ctx.params.id })
        .exec()
        .then(() => {
            ctx.response.status = 200
        })
        .catch(err => {
            ctx.response.status = 500
            ctx.response.body = { msg: err.errmsg }
        })
})

module.exports = router
