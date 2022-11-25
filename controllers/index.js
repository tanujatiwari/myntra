const query = require('../dbHelper')

module.exports.home = async (req, res, next) => {
    try {
        const data = await query.findData()
        res.json(data)
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