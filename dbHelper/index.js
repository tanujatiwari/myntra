const pool = require('../models')

module.exports.checkUserExists = async (mobile) => {
    return await pool.query(`select id,mobile from users where mobile=$1`, [mobile])
}

module.exports.createUser = async (mobile) => {
    return await pool.query(`insert into users(mobile) values($1) returning id`, [mobile])
}