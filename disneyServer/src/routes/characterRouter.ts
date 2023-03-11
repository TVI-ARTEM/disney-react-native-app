const Router = require('express')
const router = new Router()

const characterController = require('../controller/characterController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/group/create', authMiddleware, characterController.createGroup)
router.get('/group/all', authMiddleware, characterController.getGroups)
router.get('/group/characters', authMiddleware, characterController.getGroupCharacters)
router.post('/comment/create', authMiddleware, characterController.createComment)
router.get('/comment/comments', authMiddleware, characterController.getComments)

module.exports = router
