const router = require('koa-router')({
    prefix: '/blog'
})
const blogController = require('../controllers/blog')

router.get('/archive', blogController.getArchive)

router.get('/list/year/:year', blogController.getList)

router.get('/list/all', blogController.getListAll)

router.get('/:id', blogController.getBlogById)

router.post('/', blogController.createBlog)

router.put('/:id', blogController.updateBlogById)

router.del('/:id', blogController.deleteBlogById)

module.exports = router
