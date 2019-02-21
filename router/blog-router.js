const router = require('koa-router')({
    prefix: '/blog'
})
const Blog = require('../db/blog')

const limit = 5

router.put('/list/:page', async ctx => {
    let { title } = ctx.request.body
    await Blog.find(
        { title: new RegExp(title) },
        { title: 1, time: 1, draft: 1 }
    )
        .skip(ctx.params.page * limit)
        .limit(limit)
        .sort({ time: -1 })
        .exec()
        .then(doc => {
            ctx.status = 200
            ctx.body = { doc }
        })
})

router.get('/:id', async ctx => {
    await Blog.findByIdAndUpdate(ctx.params.id, { $inc: { read: 1 } })
        .exec()
        .then(doc => {
            ctx.status = 200
            ctx.body = { doc }
        })
        .catch(err => {
            ctx.status = 400
            ctx.body = { msg: err.errmsg }
        })
})

router.get('/:id/manage', async ctx => {
    await Blog.findById(ctx.params.id)
        .exec()
        .then(doc => {
            ctx.status = 200
            ctx.body = { doc }
        })
        .catch(err => {
            ctx.status = 400
            ctx.body = { msg: err.errmsg }
        })
})

router.post('/', async ctx => {
    let blog = new Blog(ctx.request.body)
    await blog
        .save()
        .then(() => {
            ctx.status = 200
        })
        .catch(err => {
            ctx.status = 400
            ctx.body = { msg: err.errmsg }
        })
})

router.put('/:id', async ctx => {
    await Blog.findByIdAndUpdate(ctx.params.id, {
        update: Date.now(),
        ...ctx.request.body
    })
        .exec()
        .then(() => {
            ctx.status = 200
        })
        .catch(err => {
            ctx.status = 400
            ctx.body = { msg: err.errmsg }
        })
})

router.del('/:id', async ctx => {
    await Blog.findByIdAndDelete(ctx.params.id)
        .exec()
        .then(() => {
            ctx.status = 200
        })
        .catch(err => {
            ctx.status = 400
            ctx.body = { msg: err.errmsg }
        })
})

module.exports = router
