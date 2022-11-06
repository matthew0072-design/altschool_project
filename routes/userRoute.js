var express = require('express');
var router = express.Router();
const {newUser, loginUser } = require('../controllers/userController');
const { getAllPublishedBlogs } = require('../controllers/blogController')

/* GET home page. */
router.get('/', getAllPublishedBlogs);

router.post('/signup', newUser)
router.post('/login', loginUser)

module.exports = router;

