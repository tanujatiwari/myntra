const pool = require('../models')

module.exports.checkUserExists = async (mobile) => {
    return await pool.query(`select id,mobile from users where mobile=$1`, [mobile])
}

module.exports.createUser = async (mobile) => {
    return await pool.query(`insert into users(mobile) values($1) returning id`, [mobile])
}

module.exports.createSession = async (userId) => {
    return await pool.query(`insert into sessions(user_id) values($1) returning id`, [userId])
}

module.exports.logoutFromSessions = async (sessionId, currDate) => {
    return await pool.query(`update sessions set ended_at=$1 where id=$2`, [currDate, sessionId])
}

module.exports.getSessionData = async (sessionId) => {
    return await pool.query(`select user_id, created_at, ended_at from sessions where id=$1`, [sessionId])
}