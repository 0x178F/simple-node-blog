const Config = require("../../models/configModel");
const user = require("../../models/userModel");
const jwt = require('jsonwebtoken');
require('dotenv').config()

const index = (req, res) => {
    res.render('admin/index');
}

const logout = (req,res) => {
    res.clearCookie('token');
    res.redirect('/')
}
const login = (req, res) => {
    console.log(req.body);
    const {
        username,
        password
    } = req.body
    user.findOne({
        username
    }, (err, userData) => {
        if (userData) {
            if (userData.password == password) {
                const id = userData._id;
                const token = jwt.sign({
                    id
                }, process.env.SECRET_KEY, {
                    expiresIn: '1d'
                })
                res.cookie('token', token, {
                    maxAge: 86400 * 1000,
                    httpOnly: true,
                    secure: false
                })
                res.redirect('/admin')
            } else {
                res.redirect('/login')
            }
        } else {
            res.redirect('/register')
        }
    })
}

const getConfig = async (req, res) => {
    const config = await Config.findOne()
    res.render('admin/settings', {
        config: JSON.parse(config.config)
    })
}

const setConfig = async (req, res) => {
    await Config.findOneAndUpdate({}, {
        config: JSON.stringify(req.body)
    }, {
        upsert: true
    })
    res.cookie('message', {
        success: 'Settings saved successfully.'
    })
    res.redirect('/admin/settings')
}

module.exports = {
    getConfig,
    setConfig,
    index,
    login,
    logout
}