var express = require('express');
var router = express.Router();
const Auth = require('../middleware/auth')
const {editBlog,  getBlog, deleteBlog, getAllBlogsByOwner, updateBlogState, postNewArticle } = require('../controllers/blogController')

 router.post('/article', Auth, postNewArticle )
 router.get('/blogs', Auth, getAllBlogsByOwner)
router.get('/blog/:id',  getBlog)
router.patch('/blog/state/:id', Auth, updateBlogState)
router.patch('/blog/edit/:id', Auth, editBlog)
router.delete('/blog/:id', Auth, deleteBlog)


module.exports = router;
           