const router = require('koa-router')({
    prefix: '/auth'
})
const authController = require('../controllers/auth')

router.get('/', authController.auth)

module.exports = router
