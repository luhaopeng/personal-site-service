const Blog = require('../db/blog')
const { decrypt } = require('../utils/crypto')
const dayjs = require('dayjs')

const getArchive = async ctx => {
    let doc = await Blog.aggregate([
        { $match: { draft: false } },
        { $project: { year: { $year: '$time' }, _id: 0 } },
        { $group: { years: { $addToSet: '$year' }, _id: null } }
    ]).exec()
    let years = doc[0].years.sort((a, b) => b - a)
    ctx.res.ok({ data: { years } })
}

const getList = async ctx => {
    let year = parseInt(ctx.params.year)
    if (isNaN(year)) {
        ctx.res.badRequest({ message: 'year格式有误' })
        return
    }
    let doc = await Blog.find(
        {
            draft: false,
            time: {
                $gte: new Date(year, 0, 1),
                $lt: new Date(year + 1, 0, 1)
            }
        },
        { title: 1, time: 1 }
    )
        .sort({ time: -1 })
        .exec()
    ctx.res.ok({ data: { doc } })
}

const getListAll = async ctx => {
    let { page, per_page, title, auth } = ctx.query
    try {
        let expire = decrypt(auth)
        if (dayjs().isAfter(dayjs(expire))) {
            throw new Error('expired')
        }
    } catch (error) {
        ctx.res.unauthorized()
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
            ctx.res.ok({ data: { doc } })
        })
}

const getBlogById = async ctx => {
    let { from } = ctx.query
    let find = Blog.findById(ctx.params.id)
    let findAndUpdate = Blog.findByIdAndUpdate(ctx.params.id, {
        $inc: { read: 1 }
    })
    let query = from === 'manage' ? find : findAndUpdate
    await query
        .exec()
        .then(doc => {
            ctx.res.ok({ data: { doc } })
        })
        .catch(err => {
            ctx.res.badRequest({ message: err.message })
        })
}

const createBlog = async ctx => {
    let { auth } = ctx.query
    try {
        let expire = decrypt(auth)
        if (dayjs().isAfter(dayjs(expire))) {
            throw new Error('expired')
        }
    } catch (error) {
        ctx.res.unauthorized()
        return
    }
    let blog = new Blog(ctx.request.body)
    await blog
        .save()
        .then(doc => {
            ctx.res.ok({ data: { id: doc._id } })
        })
        .catch(err => {
            ctx.res.badRequest({ message: err.message })
        })
}

const updateBlogById = async ctx => {
    let { auth } = ctx.query
    try {
        let expire = decrypt(auth)
        if (dayjs().isAfter(dayjs(expire))) {
            throw new Error('expired')
        }
    } catch (error) {
        ctx.res.unauthorized()
        return
    }
    await Blog.findByIdAndUpdate(ctx.params.id, {
        update: Date.now(),
        ...ctx.request.body
    })
        .exec()
        .then(() => {
            ctx.res.ok()
        })
        .catch(err => {
            ctx.res.badRequest({ message: err.message })
        })
}

const deleteBlogById = async ctx => {
    let { auth } = ctx.query
    try {
        let expire = decrypt(auth)
        if (dayjs().isAfter(dayjs(expire))) {
            throw new Error('expired')
        }
    } catch (error) {
        ctx.res.unauthorized()
        return
    }
    await Blog.findByIdAndDelete(ctx.params.id)
        .exec()
        .then(() => {
            ctx.res.ok()
        })
        .catch(err => {
            ctx.res.badRequest({ message: err.message })
        })
}

module.exports = {
    getArchive,
    getList,
    getListAll,
    getBlogById,
    createBlog,
    updateBlogById,
    deleteBlogById
}
