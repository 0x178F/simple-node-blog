const user = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const getHandler = (req, res) => {
    res.render('login', {pageTitle: "Login Page"})
}

const postHandler = (req, res) => {
    const {
        username,
        password
    } = req.body
    user.findOne({
        username
    }, (err, userData) => {
        if (userData) {
            if (userData.password == password) {
                //User Session
                const id = userData._id;
                const token = jwt.sign({id}, process.env.SECRET_KEY, {expiresIn: '1d'})
                res.cookie('token', token, { maxAge: 86400 * 1000,httpOnly: true, secure: false})
                res.redirect('/')
            } else {
                res.redirect('/login')
            }
        } else {
            res.redirect('/register')
        }
    })
}

module.exports = {
    getHandler,
    postHandler
}