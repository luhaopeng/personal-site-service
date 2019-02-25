const router = require('koa-router')({
    prefix: '/auth'
})
const { verify } = require('../utils/auth')
const { encrypt } = require('../utils/crypto')
const dayjs = require('dayjs')

router.get('/', ctx => {
    let { token } = ctx.query
    if (!verify(token)) {
        ctx.status = 401
        return
    }
    let expire = dayjs()
        .add(2, 'hour')
        .toISOString()
    ctx.status = 200
    ctx.body = { auth: encrypt(expire) }
})

module.exports = router
