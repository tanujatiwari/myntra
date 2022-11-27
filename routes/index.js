const express = require('express')
const router = express.Router()

const controllers = require('../controllers')

router.post('/login', controllers.login)

router.post('/login/otplogin', controllers.otplogin)

router.use('*', controllers.notFound)

module.exports = router