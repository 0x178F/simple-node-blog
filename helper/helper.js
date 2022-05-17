const category = require('../models/categoryModel');
const Config = require("../models/configModel")


const helper = {
    globalLocals: async(req,res,next) => {
        res.locals = {
            settings: await Config.findOne().then((config) => {return JSON.parse(config.config)}),
            categories: await category.find({}).sort({$natural: -1})
        }
        next()
    },   
    flashMessage: (req,res,next) =>{
        res.locals.message = req.cookies['message']
        res.clearCookie('message')
        next()
    }
}
module.exports = helper