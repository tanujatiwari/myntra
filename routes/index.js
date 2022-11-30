const express = require('express')
const router = express.Router()

const controllers = require('../controllers')
const authenticateToken = require('../middlewares/jwt')

router.post('/login', controllers.login)

router.post('/login/otplogin', controllers.otpLogin)

router.post('/generate-refresh-token', controllers.generateRefreshToken)

router.post('/logout', authenticateToken, controllers.logout)

router.post('/test', authenticateToken, (req,res,next)=>{
    console.log(req.cookies)
    res.send('ok')
})

router.use('*', controllers.notFound)

module.exports = router