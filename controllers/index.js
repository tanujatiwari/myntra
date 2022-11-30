const query = require('../dbHelper')
const { generateOtp } = require('../services/otp')
const redis = require('../redis')
const client = require('../services/messaging')
const jwt = require('jsonwebtoken')

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '2h' })
}

const generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '1d' })
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
        //create session
        const userId = userIdObject.rows[0].id
        const sessionIdObject = await query.createSession(userId)
        const sessionId = sessionIdObject.rows[0].id
        //create jwt token and store in redis
        const userData = { mobile, userId, sessionId }
        const accessToken = generateAccessToken(userData)
        const refreshToken = generateRefreshToken(userData)
        await redis.set(refreshToken, Date.now())
        //send token to user
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None', secure: true,
            maxAge: 24 * 60 * 60 * 1000 //1 day expiration
        })
        res.json({ message, accessToken })
    }
    catch (err) {
        next(err)
    }
}

module.exports.generateRefreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.jwt;
        if (!refreshToken)
            return res.status(403).json({ "message": "No token found" })
        if (!(await redis.get(refreshToken))) {
            return res.status(403).json({ "message": "Invalid or expired token" })
        }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
            if (err)
                return res.status(403).json({ "message": "Invalid or expired token" })
            const accessToken = generateAccessToken({ mobile: user.mobile, sessionId: user.sessionId, userId: user.userId })
            res.json({ accessToken })
        })
    }
    catch (err) {
        next(err)
    }
}

module.exports.logout = async (req, res, next) => {
    try {
        console.log(req.cookies)
        console.log(req.cookie)
        const refreshToken = req.cookies.jwt;
        if (!refreshToken) {
            const err = new Error('No refresh token found')
            return next(err)
        }
        //update session
        const { sessionId } = req.user
        const currDate = new Date()
        await query.logoutFromSessions(sessionId, currDate.toISOString())
        //delete from redis
        await redis.del(refreshToken);
        //delete your refresh token cookie
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