const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config()

async function auth(req, res) {
    if (req.cookies.token) {
        const verify = jwt.verify(req.cookies.token, process.env.SECRET_KEY)
        const user = await User.findById(verify.id)
        if (user) {
            res.locals.user = user
            return user
        } else {
            res.locals.user = null;
            res.clearCookie('token');
            res.status(401).end('Authentication failed!')
        }
    }
}

const isLogin = async (req, res, next) => {
    await auth(req, res);
    next()

}
const isAdmin = async (req, res, next) => {
    if (req.path == '/login' && req.method == 'POST') {
        next()
    } else {
        const validation = await auth(req, res)
        if (validation) {
            if (validation.role === 1) {
                next()
            } else {
                res.render('admin/login')
            }
        } else {
            res.render('admin/login')
        }
    }
}
module.exports = {
    isLogin,
    isAdmin
}