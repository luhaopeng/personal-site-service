const router = require('koa-router')({
    prefix: '/blog'
})
const Blog = require('../db/blog')
const { decrypt } = require('../utils/crypto')
const dayjs = require('dayjs')

router.get('/list', async ctx => {
    let { page, per_page, title, auth } = ctx.query
    let expire = decrypt(auth)
    if (dayjs().isAfter(dayjs(expire))) {
        ctx.status = 401
        return
    }
    let limit = parseInt(per_page)
    let skip = parseInt(page) * limit
    await Blog.find(
        { title: new RegExp(title) },
        { title: 1, time: 1, draft: 1 }
    )
        .skip(skip)
        .limit(limit)
        .sort({ time: -1 })
        .exec()
        .then(doc => {
            ctx.status = 200
            ctx.body = { doc }
        })
})

router.get('/:id', async ctx => {
    let { from } = ctx.query
    let query =
        from === 'manage'
            ? Blog.findById(ctx.params.id)
            : Blog.findByIdAndUpdate(ctx.params.id, { $inc: { read: 1 } })
    await query
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
    let { auth } = ctx.query
    let expire = decrypt(auth)
    if (dayjs().isAfter(dayjs(expire))) {
        ctx.status = 401
        return
    }
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
    let { auth } = ctx.query
    let expire = decrypt(auth)
    if (dayjs().isAfter(dayjs(expire))) {
        ctx.status = 401
        return
    }
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
    let { auth } = ctx.query
    let expire = decrypt(auth)
    if (dayjs().isAfter(dayjs(expire))) {
        ctx.status = 401
        return
    }
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
