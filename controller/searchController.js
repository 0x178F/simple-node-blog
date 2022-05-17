const Post = require("../models/postModel");

const search = async (req, res) => {
    console.log(req.query);
    if (req.query.search) {
        const postPerPage = 4
        const page = req.query.page || 1

        const query = req.query.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const databaseQuery = new RegExp(query, 'gi');

        const searchData = await Post.find({title: databaseQuery})
        .skip((postPerPage * page) - postPerPage)
        .limit(postPerPage)

        const postCount = await Post.countDocuments({title: databaseQuery})

        res.render('index', {
            postData: searchData,
            current: parseInt(page),
            pages: Math.ceil(postCount / postPerPage),
            pageTitle: "Search Page"
        })
    } else {
        res.redirect('/ ')
    }
}
module.exports = {
    search
}