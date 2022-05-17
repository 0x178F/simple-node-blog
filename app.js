require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const cookieParser = require('cookie-parser');
const helper = require('./helper/helper');

app.use(express.static('public'))
app.use(express.static('public/admin'))

app.set('view engine', 'ejs')

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true
}, (err) => {
    if (!err) {
        app.listen(process.env.PORT || 3000)
        console.log("server is online")
    } else {
        console.log("database not connected.")
    }
})

app.use(cookieParser());
app.use(express.urlencoded({
    extended: false
}));
app.use(helper.globalLocals)
app.use(helper.flashMessage)
app.use(authMiddleware.isLogin)
app.use(userRoutes)
app.use('/admin', authMiddleware.isAdmin, adminRoutes);