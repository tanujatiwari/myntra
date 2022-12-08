const query = require('../dbHelper')
const { generateOtp } = require('../services/otp')
const redis = require('../redis')
const client = require('../services/messaging')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// const main = require('../services/email')
const nodemailer = require('nodemailer');

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '5h' })
}

module.exports.login = async (req, res, next) => {
    try {
        const { number } = req.body;
        const mobile = number;
        //check if user exists`
        const userData = await query.getUserDetails(mobile)
        if (!userData) {
            const err = new Error('Cannot fetch user details from database')
            return next(err)
        }
        let userId;
        if (userData.rows.length === 0) {
            //create user
            const newUserId = await query.createUser(mobile)
            userId = newUserId.rows[0].id
            res.status(201)
            //ok byeeeeeeee
        }
        //create otp and store in redis
        const otp = await generateOtp()
        const expiryTime = Date.now() + 1000 * 60 * 1000
        const redisKey = `${mobile}:${expiryTime}`
        await redis.set(redisKey, otp);
        //send otp to user
        await client.messages
            .create({
                body: `${otp} is your OTP to login to Myntra. DO NOT share with anyone. MYNTRA never calls to ask for OTP. The otp expires in 10 mins.\nPlease note that this message is just a part of our project to increase our technical skills. We do not intend to leak user information and harm your data privacy. It is just a demo project with the goal of implementing and showcasing our skills in an innovative way.
                `,
                to: `+91${mobile}`,
                from: process.env.TWILIO_PHONE,
            })

        res.json({
            "message": `otp successfully sent to ${mobile}`,
        })

    }
    catch (err) {
        next(err);
    }
}

module.exports.otpLogin = async (req, res, next) => {
    try {
        const { mobile, otp } = req.body;
        const userIdObject = await query.getUserDetails(mobile)
        if (!userIdObject) {
            const err = new Error('Cannot fetch user details from database')
            return next(err)
        }
        if (userIdObject.rows.length === 0) {
            const err = new Error('Mobile number not found in database')
            err.statusCode = 404
            return next(err)
        }
        let message;
        //fetch mobile from redis and match otp
        const allKeys = await redis.keys(`${mobile}:*`)
        for (let i = 0; i < allKeys.length; i++) {
            let value = await redis.get(allKeys[i])
            if (Number(value) === otp) {
                message = 'OTP verified.'
                break;
            }
        }
        if (!message) {
            const err = new Error('Invalid or expired otp')
            err.statusCode = 401
            return next(err)
        }
        let userId = userIdObject.rows[0].id
        const userData = { loginId: mobile, userId }
        const accessToken = generateAccessToken(userData)
        res.cookie('jwt', accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 //1 day expiration
        })
        res.json({ message })
    }
    //the coders of this code are doomed
    catch (err) {
        next(err)
    }
}

module.exports.passwordLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userIdObject = await query.getUserDetails(email)
        if (!userIdObject) {
            const err = new Error('Cannot fetch user details from database')
            return next(err)
        }
        if ((userIdObject.rows.length === 0)) {
            let message = 'Account does not exist'
            const err = new Error(message)
            err.statusCode = 400
            err.clientMessage = message
            return next(err)
        }
        if (!(await bcrypt.compare(password, userIdObject.rows[0].password))) {
            let message = 'Email and password does not match'
            const err = new Error(message)
            err.statusCode = 403
            err.clientMessage = message
            return next(err)
        }
        let userId = userIdObject.rows[0].id
        const userData = { loginId: email, userId }
        const accessToken = generateAccessToken(userData)
        res.cookie('jwt', accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 //1 day expiration
        })
        res.json({ "message": "Logged in successfully!" })
    }
    //who you????????????
    //who you think you??????
    //which year?????????
    catch (err) {
        next(err)
    }
}

module.exports.createAccount = async (req, res, next) => {
    try {
        const { password, name, email, gender, number1, hintName, location, birthDate } = req.body;
        const { userId } = req.user
        const bcryptRounds = 10
        const hashedPassword = bcrypt.hashSync(password, bcryptRounds)
        await query.addNewUserDetails(userId, name, hashedPassword, email, gender, location, number1, hintName, birthDate);
        res.status(201).json({ "message": "User Sign up successful!" })
    }
    catch (err) {
        next(err)
    }
}

// module.exports.forgetPassword = async (req, res, next) => {
//     try {
//         //email ya text kardo password reset link ko
//         const { loginId } = req.body;
//         const userIdObject = await query.getUserDetails(loginId)
//         if (!userIdObject) {
//             const err = new Error('Cannot fetch user details from database')
//             return next(err)
//         }
//         if (userIdObject.rows.length === 0) {
//             const message = 'Account does not exist'
//             const err = new Error(message)
//             err.clientMessage = message
//             err.statusCode = 400
//             return next(err)
//         }
//         //send email/mobile with password reset link
//         if (loginId.includes('@')) { //email
//             const transporter = nodemailer.createTransport({
//                 service: 'SendPulse',
//                 auth: {
//                     user: 'tanujatiwari444@gmail.com',
//                     pass: 'Suryansh@5476'
//                 }
//             });

//             const mailOptions = {
//                 from: 'tanujatiwari444@gmail.com', // sender address
//                 to: 'tanujatiwari04@gmail.com', // list of receivers
//                 subject: 'Hello', // Subject line
//                 text: 'Hello world?', // plain text body
//                 html: '<b>Hello world?</b>' // html body
//             };
//             //daddu paaagalllllll
//             //chitta daddu toa tappe
//             //tap chitte daddu aa
//             //hello, my name is zuzi
//             // A zuzi with a zee

//             transporter.sendMail(mailOptions, (error, info) => {
//                 if (error) {
//                     return console.log(error);
//                 }
//                 console.log('Message sent: %s', info.messageId);
//                 res.send('email sent')
//             });
//         }
//         else { //mobile number

//         }
//     }
//     catch (err) {
//         console.log(err)
//         next(err)
//     }
// }

module.exports.logout = async (req, res, next) => {
    try {
        res.clearCookie("jwt");
        res.json({ "message": "Successfully logged out!" })
    }
    catch (err) {
        next(err)
    }
}

module.exports.newAddress = async (req, res, next) => {
    try {
        const { full_name, mobile, pincode, state, address, locality, city, typeOfAddress, isDefaultAddress, isOpenOnSaturday, isOpenOnSunday } = req.body
        const { userId } = req.user
        await query.addUserAddress(userId, full_name, mobile, pincode, state, address, locality, city, typeOfAddress, isDefaultAddress, isOpenOnSaturday, isOpenOnSunday)
        return res.status(201).json({ "message": "Address added successfully" })
    }
    catch (err) {
        next(err)
    }
}

module.exports.updateAddress = async (req, res, next) => {
    try {
        const { id } = req.params
        const { full_name, mobile, pincode, state, address, locality, city, typeOfAddress, isDefaultAddress, isOpenOnSaturday, isOpenOnSunday } = req.body
        await query.editUserAddress(id, full_name, mobile, pincode, state, address, locality, city, typeOfAddress, isDefaultAddress, isOpenOnSaturday, isOpenOnSunday)
        return res.status(201).json({ "message": "Address edited successfully" })
    }
    catch (err) {
        next(err)
    }
}

module.exports.deleteAddress = async (req, res, next) => {
    try {
        const { id } = req.params
        const currDate = new Date()
        await query.deleteAddress(currDate.toISOString(), id)
        res.json({ "message": "Address deleted successfully" })
    }
    catch (err) {
        next(err)
    }
}

module.exports.profile = async (req, res, next) => {
    try {
        const { loginId, userId } = req.user
        const [userObject, addressesObject] = await Promise.all([query.getUserDetails(loginId), query.getUserAddresses(userId)])
        const userDetails = { ...userObject.rows[0] }
        if (addressesObject.rows.length === 0) {
            userDetails.addresses = [];
        }
        else {
            userDetails.addresses = addressesObject.rows;
        }
        res.json({ "data": userDetails })
    }
    catch (err) {
        next(err)
    }
}

module.exports.editProfile = async (req, res, next) => {
    try {
        const { userId } = req.user
        const { full_name, email, gender, hint_name, alternate_mobile, birth_date, location } = req.body;
        await query.editProfile(userId, full_name, email, gender, hint_name, alternate_mobile, birth_date, location)
        res.json({ "message": "Edited profile successfully!" })
    }
    catch (err) {
        console.log(err)
        next(err)
    }
}

module.exports.getCategoryProducts = async (req, res, next) => {
    try {
        const productsObject = await query.getCategoryProducts();
        res.json({ "data": productsObject.rows })
    }
    catch (err) {
        next(err)
    }
}

module.exports.getSubcategoryProducts = async (req, res, next) => {
    try {
        const productsObject = await query.getSubcategoryProducts();
        res.json({ "data": productsObject.rows })
    }
    catch (err) {
        next(err)
    }
}

module.exports.getProductTypeProduct = async (req, res, next) => {
    try {
        const productsObject = await query.getProductTypeProduct();
        res.json({ "data": productsObject.rows })
    }
    catch (err) {
        next(err)
    }
}

module.exports.getProduct = async (req, res, next) => {
    try {
        const productsObject = await query.getProduct();
        res.json({ "data": productsObject.rows })
    }
    catch (err) {
        next(err)
    }
}

module.exports.notFound = (req, res, next) => {
    const err = new Error(`Cannot ${req.method} ${req.path}`)
    err.statusCode = 404
    err.clientMessage = `Requested URL ${req.path} not found`
    next(err)
}