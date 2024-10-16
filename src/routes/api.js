const express = require('express');
const router = express.Router();
const apiLoginRegiter = require('../controllers/apiLoginRegiter');
const userController = require('../controllers/userController');
const groupControllers = require('../controllers/groupController');
const moviesController = require('../controllers/moviesController');
const categoryController = require('../controllers/categoryController');
const episodeController = require('../controllers/episodeController')
const commentController = require('../controllers/commentController')
const historyController = require('../controllers/historyController')
const accountController = require('../controllers/accountController')
const {checkUserJWT,checkUserPermision} = require('../middleware/jwtAction')


/// test api
// router.all('*',checkUserJWT,checkUserPermision)

///CRUD
router.post("/register",apiLoginRegiter.handleRegister);
router.post("/login",apiLoginRegiter.handleLogin);
router.post("/logout",apiLoginRegiter.handleLogout);

///

router.get('/user/read',userController.readFunc);
router.post('/user/create',userController.createFunc);
router.put('/user/update',userController.updateFunc);
router.delete('/user/delete',userController.deleteFunc)
// get group
router.get('/group/read',groupControllers.readFunc);

// CRUD phim
router.get('/movie/read',moviesController.readFunc);
router.post('/movie/create',moviesController.createFunc);
router.put('/movie/update',moviesController.updateFunc);
router.delete('/movie/delete',moviesController.deleteFunc)
// phim theo loại và quốc gia
router.get('/movie/type',moviesController.readMovieType);
router.get('/movie/national',moviesController.readMovieNational);
/// phim yêu thcis
router.get('/movie/like',moviesController.readLikeFunc)
router.post('/movie/createLike',moviesController.createLikeFunc);
router.delete('/movie/deleteLike',moviesController.deleteLikeFunc)
/// lịch sử xem phim
router.get('/movie/history',historyController.readFunc)
router.post('/movie/create-history',historyController.createFunc)
// account
router.get('/account/read',accountController.readFunc)
router.put('/account/password/update',accountController.updateFunc)
// get category
router.get('/category/read',categoryController.readFunc);
router.post('/category/create',categoryController.createFunc);
router.put('/category/update',categoryController.updateFunc);
router.delete('/category/delete',categoryController.deleteFunc)
////

//get episode
router.get('/episode/read',episodeController.readFunc);
router.post('/episode/create',episodeController.createFunc);
router.put('/episode/update',episodeController.updateFunc);
router.delete('/episode/delete',episodeController.deleteFunc)
/// comment
 router.get('/comment/read',commentController.readFunc);
 router.delete('/comment/delete',commentController.deleteFunc);
 router.post('/comment/create',commentController.createFunc);
module.exports = router;