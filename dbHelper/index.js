const pool = require('../models')

module.exports.getUserDetails = async (loginId) => {
    return await pool.query(`select id,full_name, mobile,email,password,gender,birth_date,location,alternate_mobile,hint_name from users where mobile=$1 or email=$1`, [loginId])
}

module.exports.createUser = async (mobile) => {
    return await pool.query(`insert into users(mobile) values($1) returning id`, [mobile])
}

module.exports.addUserAddress = async (userId, fullName, mobile, pincode, state, address, locality, city, typeOfAddress, isDefaultAddress, isOpenOnSaturday, isOpenOnSunday) => {
    return await pool.query(`insert into addresses(user_id, full_name, mobile, pincode, state, address, locality, city, type_of_address, is_default_address, is_open_on_saturday, is_open_on_sunday) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`, [userId, fullName, mobile, pincode, state, address, locality, city, typeOfAddress, isDefaultAddress, isOpenOnSaturday, isOpenOnSunday])
}

module.exports.addNewUserDetails = async (userId, fullName, password, email, gender, location, alternateMobile, hintName, birthDate) => {
    return await pool.query(`update users set full_name=$1, email=$2, password=$3, gender=$4, alternate_mobile=$5, location=$6, hint_name=$7, birth_date=$8 where id=$9`, [fullName, email, password, gender, alternateMobile, location, hintName, birthDate, userId])
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

module.exports.editProfile = async (userId, name, email, gender, hintName, alternateMobile, birthDate, location) => {
    return await pool.query(`update users set full_name=$2, email=$3, gender=$4, hint_name=$5, alternate_mobile=$6, birth_date=$7, location=$8 where id=$1`, [userId, name, email, gender, hintName, alternateMobile, birthDate, location])
}

module.exports.countProducts = async (category) => {
    return await pool.query(`
    select count(*)
    from products
    inner join product_types on products.product_type_id = product_types.id 
    inner join subcategories on product_types.subcategory_id = subcategories.id
    inner join categories on categories.id = subcategories.category_id
    where categories.name=$1
    `, [category])
}

module.exports.getCategoryProducts = async (category, page) => {
    return await pool.query(`
    select products.id, product_type_id, title, details, care_instructions, dominant_material, product_type, size_fit, brand, seller, ratings, no_of_ratings, material_and_care, discount, dominant_color, stock, price, compare_at_price, size, features, is_in_stock
    ,subcategories.name as "subcategory", categories.name as "category"
    from products
    inner join product_types on products.product_type_id = product_types.id 
    inner join subcategories on product_types.subcategory_id = subcategories.id
    inner join categories on categories.id = subcategories.category_id
    where categories.name=$1
    limit 20 offset $2
    `, [category, page]);
}

module.exports.getSubcategoryProducts = async () => {
    return await pool.query(`select * from products`);
}

module.exports.getProductTypeProduct = async () => {
    return await pool.query(`select * from products`);
}

module.exports.getProduct = async () => {
    return await pool.query(`select * from products`);
}

module.exports.findCategoryId = async (category) => {
    return await pool.query(`select id from categories where name ilike '%${category}%'`)
}

module.exports.getAllSubcategories = async () => {
    return await pool.query('select id, name, category_id from subcategories');
}

module.exports.findProductTypeId = async (categoryId, productType, subcategoryId) => {
    return await pool.query(`
    select product_types.id from product_types inner join subcategories on product_types.subcategory_id = subcategories.id inner join categories on subcategories.category_id = categories.id where category_id = '${categoryId}' and product_types.name ilike '%${productType}%' and subcategories.id='${subcategoryId}';
    `)
}

module.exports.findSubCatId = async (subcategory, categoryId) => {
    return await pool.query(`select id from subcategories where name ilike '%${subcategory}%' and category_id = '${categoryId}'`)
}

module.exports.addNewImage = async (productId, image) => {
    return await pool.query(`insert into images(product_id, image_link) values('${productId}','${image}')`)
}

module.exports.resetPassword = async (loginId, password) => {
    return await pool.query(`update users set password=$2 where email=$1 or mobile=$1`, [loginId, password])
}

module.exports.addProduct = async (brand, seller, ratings, noOfRatings, price, comparePrice, size, materialAndCare, dominantMaterial, productDetails, features, sizeFit, inStock, stock, discount, title, productType, color, subSubCategoryId) => {
    return await pool.query(`insert into products("brand", "seller", "ratings", "no_of_ratings", "price", "compare_at_price", "size", "material_and_care", "dominant_material", "details", "features", "size_fit", "is_in_stock", "stock", "discount", "title", "product_type", "dominant_color", "product_type_id") values($1,$2,'${ratings}','${noOfRatings}','${price}','${comparePrice}',$3,$4,$5,$6,$7,$8,'${inStock}','${stock}','${discount}',$9,$10,$11,$12) returning id`, [brand, seller, size, materialAndCare, dominantMaterial, productDetails, features, sizeFit, title, productType, color, subSubCategoryId]);
}

module.exports.getAllImages = async (productId) =>{
    return await pool.query(`select id, product_id, image_link from images where product_id=$1`,[productId])
}