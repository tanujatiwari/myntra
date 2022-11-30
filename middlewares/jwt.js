const jwt = require('jsonwebtoken')
const query = require('../dbHelper')

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(403).json({ "message": "Please register or login first" })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
        if (err) {
            return res.status(403).json({ "message": "Invalid or expired session. Please login again" })
        }
        const { sessionId } = user
        const sessionDetails = await query.getSessionData(sessionId)
        if (sessionDetails.rows[0].ended_at !== null) { //if expired
            return res.status(403).json({ "message": "Invalid or expired session. Please login again" })
        }
        req.user = user
        next()
    })
}

module.exports = authenticateToken