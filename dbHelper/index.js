const pool = require('../models')

module.exports.findData = async () =>{
    return await pool.query(`select * from users;`)
}