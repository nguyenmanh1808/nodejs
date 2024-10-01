const express = require('express');
const router = express.Router();
const homeController = require('../controllers/HomeController');
const apiLoginRegiter = require('../controllers/apiLoginRegiter');

router.get('/', homeController.getabc)
router.get('/admin/users', homeController.getHomepage)
router.post('/create-user', homeController.postCreateUsers)
router.get('/create',  homeController.createUser)
router.get('/phim/:slug',  homeController.deatailMovie)
router.get('/page/:id',  homeController.addMovies)
router.get('/login',  homeController.login)
router.get('/register',  homeController.register)
router.get('/update-user/:id',  homeController.updateUser)
router.post('/update-user',homeController.handleUpdateUser)
router.post('/delete-user/:id', homeController.HandleDeleteUser)

/// test api
 router.get('/api/test-api',apiLoginRegiter.testApi)

module.exports = router;