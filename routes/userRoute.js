var express = require('express');
var router = express.Router();
const {newUser, loginUser, logoutUser } = require('../controllers/userController');
const { checkUser } = require('../middleware/auth')
const { getAllPublishedBlogs } = require('../controllers/blogController')
// const { checkUser } = require('../middleware/auth')

/* GET home page. */
//router.get('/', getAllPublishedBlogs);

     
router.get('/', getAllPublishedBlogs )

router.get('/signup', (req, res) => {
    res.render('register')
}) 

router.get('/login', (req, res) => {
    res.render('login')
}) 

router.get('/contact', (req, res) => {
    res.render('contact')
}) 
  
router.get('/logout', logoutUser)

router.post('/signup', newUser)
router.post('/login', loginUser)
   


module.exports = router;

