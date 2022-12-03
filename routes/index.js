const express = require('express')
const router = express.Router()

const controllers = require('../controllers')
const authenticateToken = require('../middlewares/jwt')

//auth routes
router.post('/login', controllers.login)

router.post('/login/otplogin', controllers.otpLogin)

router.post('/password', controllers.passwordLogin)

router.post('/signup', authenticateToken, controllers.createAccount)

router.post('/logout', authenticateToken, controllers.logout)

// router.post('/forgot', controllers.forgetPassword)

//user data routes

router.get('/profile', authenticateToken, controllers.profile)

router.patch('/edit-profile', authenticateToken, controllers.editProfile)

router.get('/addresses', authenticateToken, controllers.getAddresses)

router.post('/addresses/new',authenticateToken, controllers.newAddress)

router.patch('/addresses/:id/update', authenticateToken, controllers.updateAddress)

router.delete('/addresses/:id/delete',authenticateToken, controllers.deleteAddress)

router.use('*', controllers.notFound)

module.exports = router