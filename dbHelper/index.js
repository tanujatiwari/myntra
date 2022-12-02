const pool = require('../models')

module.exports.checkUserExists = async (loginId) => {
    return await pool.query(`select id,mobile,email,password from users where mobile=$1 or email=$1`, [loginId])
}

module.exports.createUser = async (mobile) => {
    return await pool.query(`insert into users(mobile) values($1) returning id`, [mobile])
}

module.exports.addUserAddress = async (userId, fullName, mobile, pincode, state, address, locality, city, typeOfAddress, isDefaultAddress, isOpenOnSaturday, isOpenOnSunday) => {
    return await pool.query(`insert into addresses(user_id, full_name, mobile, pincode, state, address, locality, city, type_of_address, is_default_address, is_open_on_saturday, is_open_on_sunday) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`, [userId, fullName, mobile, pincode, state, address, locality, city, typeOfAddress, isDefaultAddress, isOpenOnSaturday, isOpenOnSunday])
}

module.exports.addNewUserDetails = async (userId, fullName, password, email, gender, alternateMobile, hintName, location, birth_date) => {
    return await pool.query(`update users set full_name=$1, email=$2, password=$3, gender=$4, alternate_mobile=$5, location=$6, hint_name=$7, birth_date=$8 where id=$9`, [fullName, email, password, gender, alternateMobile, location, hintName, birth_date, userId])
}

module.exports.getUserAddresses = async (userId) => {
    return await pool.query(`select id, full_name, mobile, pincode, state, address, locality, city, type_of_address, is_default_address, is_open_on_saturday, is_open_on_sunday, created_at from addresses where user_id=$1 and archived_at is null`, [userId])
}

module.exports.deleteAddress = async (currDate, addressId) => {
    return await pool.query(`update addresses set archived_at=$1 where id=$2`, [currDate, addressId])
}

module.exports.editUserAddress = async (addressId, fullName, mobile, pincode, state, address, locality, city, typeOfAddress, isDefaultAddress, isOpenOnSaturday, isOpenOnSunday) => {
    return await pool.query(`update addresses set full_name=$2, mobile=$3, pincode=$4, state=$5, address=$6, locality=$7, city=$8, type_of_address=$9, is_default_address=$10, is_open_on_saturday=$11, is_open_on_sunday=$12 where id=$1`, [addressId, fullName, mobile, pincode, state, address, locality, city, typeOfAddress, isDefaultAddress, isOpenOnSaturday, isOpenOnSunday])
}