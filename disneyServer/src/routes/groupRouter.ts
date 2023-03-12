const Router = require('express')
const router = new Router()

const groupController = require('../controller/groupController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, groupController.createGroup)
router.post('/add', authMiddleware, groupController.addGroupCharacter)
router.get('/all', authMiddleware, groupController.getGroups)
router.get('/characters', authMiddleware, groupController.getGroupCharacters)


module.exports = router
