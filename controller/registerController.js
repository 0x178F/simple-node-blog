const User = require('../models/userModel');

const getHandler = (req, res) => {
    res.render('register', {pageTitle: "Register Page"})
}

const postHandler = async (req, res) => {
    await User.create({
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    }).catch(err =>
        console.log(err._message)
    )
    res.redirect('/')
}

module.exports = {
    getHandler,
    postHandler
}