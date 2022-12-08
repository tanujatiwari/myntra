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

//user data route
router.get('/profile', authenticateToken, controllers.profile)

router.patch('/edit-profile', authenticateToken, controllers.editProfile)

router.post('/addresses/new', authenticateToken, controllers.newAddress)

router.patch('/addresses/:id/update', authenticateToken, controllers.updateAddress)

router.delete('/addresses/:id/delete', authenticateToken, controllers.deleteAddress)

//products

router.get('/api/products/:category', controllers.getCategoryProducts)

router.get('/api/products/:category/:subcategory', controllers.getSubcategoryProducts)

router.get('/api/products/:category/:subcategory/:productType', controllers.getProductTypeProduct)

router.get('/api/products/:category/:subcategory/:productType/:productId', controllers.getProduct)

//wishlist and bag

router.post('/api/products/:category/:subcategory/:productType/:productId/wishlist')

router.post('/api/products/:category/:subcategory/:productType/:productId/bag')

router.use('*', controllers.notFound)

module.exports = router