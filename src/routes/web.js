const express = require('express');
const router = express.Router();
const { getHomepage, getabc, postCreateUsers, createUser, updateUser, deatailMovie, addMovies, login, register } = require('../controllers/HomeController');
router.get('/', getabc)
router.get('/admin/users', getHomepage)


router.post('/create-user', postCreateUsers)

router.get('/create', createUser)
router.get('/update', updateUser)
router.get('/phim/:slug', deatailMovie)
router.get('/page/:id', addMovies)
router.get('/login', login)
router.get('/register', register)
module.exports = router;