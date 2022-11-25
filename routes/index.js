const express = require('express')
const router = express.Router()

const controllers = require('../controllers')

router.get('/', controllers.home)

router.use('*', controllers.notFound)

module.exports = router