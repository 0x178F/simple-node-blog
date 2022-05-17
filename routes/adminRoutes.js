const router = require('express').Router();
const categoryController = require('../controller/admin/categoryController');
const postController = require('../controller/admin/postController');
const adminController = require('../controller/admin/adminController');


router.get('/', adminController.index)
router.post('/login', adminController.login)
router.get('/logout', adminController.logout)
router.get('/settings', adminController.getConfig).post('/settings', adminController.setConfig)
router.get('/categories', categoryController.getHandler)
router.post('/categories', categoryController.postHandler)
router.get('/posts', postController.getAllPost)
router.post('/posts', postController.deletePost)
router.get('/posts/:id', postController.getEditPost)
router.post('/posts/:id', postController.fileUpload, postController.edit)
router.get('/addPost', postController.getAddPost)
router.post('/addPost', postController.fileUpload, postController.addPost)
router.post('/delete', categoryController.deleteCategory)

module.exports = router