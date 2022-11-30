const pool = require('../models')

module.exports.checkUserExists = async (loginId) => {
    return await pool.query(`select id,mobile,email,password from users where mobile=$1 or email=$1`, [loginId])
}

module.exports.createUser = async (mobile) => {
    return await pool.query(`insert into users(mobile) values($1) returning id`, [mobile])
}