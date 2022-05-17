const blogControllers = require('../controller/blogController')
const loginController = require('../controller/loginController');
const registerController = require('../controller/registerController');
const categoryController = require('../controller/categoryController');
const searchController = require('../controller/searchController');
const router = require('express').Router();


router.get('/', blogControllers.getAllPost)
router.get('/logout', blogControllers.logout)
router.get('/search', searchController.search)
router.get('/contact', blogControllers.contact)
router.get('/login', loginController.getHandler).post('/login', loginController.postHandler)
router.get('/register', registerController.getHandler).post('/register', registerController.postHandler)
router.get('/posts/:id', blogControllers.specificPost)
router.get('/category/:categoryId', categoryController.getHandler)
module.exports = router