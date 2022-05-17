const Post = require('../models/postModel')
const Category = require('../models/categoryModel');
var ObjectId = require('mongoose').Types.ObjectId;
const User = require('../models/userModel');

const specificPost = async (req, res) => {
    const isValid = await ObjectId.isValid(req.params.id)
    if (isValid) {
        const getPost = await Post.findById(req.params.id).populate({
            path: 'author',
            model: User
        }).populate({
            path: 'category',
            model: Category
        })
        res.render('posts', {
            getPost,
            pageTitle: "Specific Post Page"
        })
    } else {
        res.status(400).send({
            error: "Invalid Post ID"
        })
    }
}

const getAllPost = async (req, res) => {
    const postPerPage = 4
    const page = req.query.page || 1
    const postData = await Post.find({}).sort({
            $natural: -1
        }).populate({
            path: 'category',
            model: Category
        })
        .skip((postPerPage * page) - postPerPage)
        .limit(postPerPage)
    const postCount = await Post.countDocuments()
    res.render('index', {
        postData,
        current: parseInt(page),
        pages: Math.ceil(postCount / postPerPage),
        pageTitle: "Home Page"
    });
};

const contact = (req, res) => {
    res.render('contact', {
        pageTitle: "Home Page"
    });
};

const logout = (req,res) => {
    res.clearCookie('token');
    res.redirect('/')
}
module.exports = {
    getAllPost,
    specificPost,
    contact,
    logout
}