const express = require('express')
const router = express.Router()

const controllers = require('../controllers')
const authenticateToken = require('../middlewares/jwt')

router.post('/login', controllers.login)

router.post('/login/otplogin', controllers.otpLogin)

router.post('/logout', authenticateToken, controllers.logout)

router.use('*', controllers.notFound)

module.exports = router