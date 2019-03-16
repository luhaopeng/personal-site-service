const router = require('koa-router')({
    prefix: '/blog'
})
const blogController = require('../controllers/blog')

router.get('/list', blogController.getList)

router.get('/:id', blogController.getBlogById)

router.post('/', blogController.createBlog)

router.put('/:id', blogController.updateBlogById)

router.del('/:id', blogController.deleteBlogById)

module.exports = router
