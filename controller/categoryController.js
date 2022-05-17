const Category = require("../models/categoryModel")
const Post = require("../models/postModel")

const getHandler = async (req, res) => {
    const postPerPage = 4
    const page = req.query.page || 1
    const postData = await Post.find({
            category: req.params.categoryId
        }).sort({
            $natural: -1
        })
        .skip((postPerPage * page) - postPerPage)
        .limit(postPerPage)
    const postCount = await Post.countDocuments({
        category: req.params.categoryId
    })
    res.render('index', {
        postData,
        current: parseInt(page),
        pages: Math.ceil(postCount / postPerPage), 
        pageTitle: "Category Page"
    })
}

module.exports = {
    getHandler
}