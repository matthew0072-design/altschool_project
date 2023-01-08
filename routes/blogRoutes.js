var express = require('express');
var router = express.Router();
const { Auth } = require('../middleware/auth')
const {editBlog,  getBlog, deleteBlog, getAllBlogsByOwner, updateBlogState, postNewArticle, editState, getEditBlog } = require('../controllers/blogController')

 router.post('/article', Auth, postNewArticle )
router.get('/article', Auth, (req, res) => {
    res.render('article')
})
 router.get('/blogs', Auth, getAllBlogsByOwner)
router.get('/blog/:id',  getBlog)
router.post('/blog/state/:id', Auth, updateBlogState )
router.get('/blog/state/:id', Auth, editState)
router.post('/blog/edit/:id', Auth, editBlog)
router.get('/blog/edit/:id', Auth, getEditBlog)
router.get('/post/:id', Auth, deleteBlog)


module.exports = router;
           