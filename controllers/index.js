const query = require('../dbHelper')
const { generateOtp } = require('../services/otp')
const redis = require('../redis')
const client = require('../services/messaging')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '2h' })
}

module.exports.login = async (req, res, next) => {
    try {
        const { mobile } = req.body;
        //check if user exists`
        const userData = await query.checkUserExists(mobile)
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
        const userIdObject = await query.checkUserExists(mobile)
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
        const userData = { mobile, userId }
        const accessToken = generateAccessToken(userData)
        res.cookie('jwt', accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 //1 day expiration
        })
        res.json({ message })
    }
    catch (err) {
        next(err)
    }
}

module.exports.passwordLogin = async (req, res, next) => {
    try {
        const { loginId, password } = req.body;
        const userIdObject = await query.checkUserExists(loginId)
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
        const userData = { mobile, userId }
        const accessToken = generateAccessToken(userData)
        res.cookie('jwt', accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 //1 day expiration
        })
        res.json({ "message": "Logged in successfully!" })
    }
    catch (err) {
        next(err)
    }

}

module.exports.logout = async (req, res, next) => {
    try {
        res.clearCookie("jwt");
        res.json({ "message": "Successfully logged out!" })
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