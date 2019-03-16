const { verify } = require('../utils/auth')
const { encrypt } = require('../utils/crypto')
const dayjs = require('dayjs')

const auth = ctx => {
    let { token } = ctx.query
    if (!verify(token)) {
        ctx.res.unauthorized()
        return
    }
    let expire = dayjs()
        .add(2, 'hour')
        .toISOString()
    ctx.res.ok({ data: { auth: encrypt(expire) } })
}

module.exports = { auth }
