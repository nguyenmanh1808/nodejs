const express = require('express');
const router = express.Router();
const { getHomepage, getabc, postCreateUsers, createUser } = require('../controllers/HomeController');

router.get('/', getHomepage)

router.get('/abc', getabc)
router.post('/create-user', postCreateUsers)

router.get('/create', createUser)
module.exports = router;