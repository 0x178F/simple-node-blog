const Category = require('../../models/categoryModel');

const getHandler = async (req, res) => {
    const categories = await Category.getAll()
    res.render('admin/category', {
        categories
    })
}

const postHandler = async (req, res) => {
    await Category.create(req.body)
    res.cookie('message', {
        success: 'Category successfully created.'
    })
    res.redirect('categories')
}

const deleteCategory = async (req, res) => {
    await Category.findByIdAndDelete(req.body).catch(err => {
        console.log("Err:", err);
    })
    res.cookie('message', {
        success: 'Category successfully deleted.'
    })

    res.redirect('categories')
}

module.exports = {
    getHandler,
    postHandler,
    deleteCategory
}