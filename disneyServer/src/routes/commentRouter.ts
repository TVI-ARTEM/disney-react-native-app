const Router = require('express')
const router = new Router()

const commentController = require('../controller/commentController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, commentController.createComment)
router.get('/comments', authMiddleware, commentController.getComments)

module.exports = router
