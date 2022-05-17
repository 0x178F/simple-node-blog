const Post = require("../../models/postModel")
const Category = require("../../models/categoryModel")
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}-${+Date.now()}`)
    }
})
const upload = multer({
    storage
})

const getAllPost = async (req, res) => {
    const postData = await Post.find({}).sort({
        $natural: -1
    }).populate({
        path: 'category',
        model: Category
    })
    res.render('admin/posts', {
        postData
    })
}

const deletePost = async (req, res) => {
    await Post.findByIdAndDelete(req.body._id)
    res.cookie('message', {
        success: 'Post successfully deleted.'
    })
    res.redirect('posts')
}

const getAddPost = (req, res) => {
    res.render('admin/addPost')
}

const addPost = async (req, res) => {
    await Post.create({
        ...req.body,
        post_image: req.file.filename,
        author: res.locals.user._id
    })
    res.cookie('message', {
        success: 'Post successfully added.'
    })
    res.redirect('addPost')
}


const getEditPost = async (req, res) => {
    const post = await Post.findById(req.params.id).sort({
        $natural: -1
    }).populate({
        path: 'category',
        model: Category
    })
    res.render('admin/editPost', {
        post
    })
}

const edit = async (req, res) => {
    const post = await Post.findOne({
        _id: req.params.id
    })
    post.title = req.body.title
    post.content = req.body.content
    post.category = req.body.category
    post.date = req.body.date
    post.post_image = req.file ? req.file.filename : post.post_image
    await post.save()
    res.cookie('message', {
        success: 'The post has been successfully updated.'
    })
    res.redirect('/admin/posts')
}


fileUpload = [
    upload.single('post_image')
]

module.exports = {
    getAllPost,
    getAddPost,
    deletePost,
    addPost,
    getEditPost,
    edit,
    fileUpload
}