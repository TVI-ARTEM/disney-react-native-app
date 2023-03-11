const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const groupRouter = require('./groupRouter')
const commentRouter = require('./commentRouter')

router.use('/user', userRouter)
router.use('/group', groupRouter)
router.use('/comment', commentRouter)

module.exports = router