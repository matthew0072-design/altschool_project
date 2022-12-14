
const Blog = require('../models/blogSchema')
const { readingTime } = require('../utils/readingTime')



const postNewArticle = async (req, res) => {
const { title, description, tags, body, state } = req.body
    const blog =  new Blog({
        title,
        description,
        state,
        tags,
        body,
        author: req.user._id,
        reading_time: readingTime(body)
      })  
    try {
        
        await blog.save()
        res.status(201).redirect('/');
      
        
     }catch(err){  
    
        res.status(500).send(err) 
     }
 
}


const getAllPublishedBlogs =  async(req, res) => {
    const { page = 1, limit = 20, author, tags, title } = req.query;

// Object to query dynamically
    const searchableQuery = {
        state: "published"
    }

    if (author) {
        searchableQuery.author = author
    }

    if (tags) {
        searchableQuery.tags = tags
    }

    if (title) {
        searchableQuery.title = title
    }

    // to Sort either by descending or ascending order
    const sort = {}

    if (req.query.sortBy) {
        const results = req.query.sortBy.split(':')
        sort[results[0]] = results[1] === 'desc' ? -1 : 1
    } 
  
   
try {
    const blogs = await Blog.find( searchableQuery).limit(limit * 1).skip((page - 1) * limit ).sort(sort)
    res.locals.blogs = blogs
    console.log(res.locals.blogs)
    res.status(200).render('homepage', { blogs: res.locals.blogs })

} catch(err) {
    
    res.status(500).send(err)
}
        
               
}

//to get the list of article created by the owner

const getAllBlogsByOwner =  async (req, res) => {
   
    const filterState = {
        state: ""
     }

    
            
      if (req.query.state === "draft") {
        filterState.state = "draft"
      } else if (req.query.state === "published")  {
        filterState.state = "published"
      } else {
        filterState.state = ""
      }


      console.log(filterState)
        

        try {
            // const blogs = await Blog.find({})
        await req.user.populate({  
            
           path: 'blogs',  
        //    match: filterState,
           options: {
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip)
           } 
            
        })
        res.locals.blogs = req.user.blogs
        // res.locals.blogs = blogs
        res.status(200).render('userBlog', {
            userBlogs: res.locals.blogs
        })
        
    } catch(err) {   
        
        res.status(500).send(err) 
    }
             
                   
    }


const getBlog = async (req, res) => {
    
    try {
        const blog = await Blog.findOne({_id:req.params.id, state:'published'}).populate('author')

        if(!blog) {
            return res.status(404).send("Article is not yet published")
        }
        blog.read_count += 1;
        await blog.save()
        res.locals.blog = blog
    
        res.status(200).render('blog', {
            
            blog: res.locals.blog
        })


    }catch (err) {
                res.status(500).send(err)
    }
}
  

const updateBlogState = async (req, res) => {
    const state = req.body.state
    
    try {
        const blog = await Blog.findByIdAndUpdate({_id:req.params.id, owner: req.user._id}, {state}, {new:true, runValidators:true})
        await blog.save()
        res.status(200).redirect('/')

    }catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
}


const editState = async (req, res) => {
    
    
    try {
    const editState = await Blog.findOne({_id:req.params.id, owner: req.user._id})
    res.locals.state = editState
    res.status(200).render('state', {
        state: res.locals.state
    })
        
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

const getEditBlog = async (req, res) => {
    
    
    try {
    const updateBlog = await Blog.findOne({_id:req.params.id, owner: req.user._id})
    res.locals.updateBlog = updateBlog
    res.status(200).render('updateBlog', {
        updateBlog: res.locals.updateBlog
    })
        
    } catch (err) {  
        console.log(err)
        res.status(500).send(err)
    }
}


const editBlog = async (req, res) => {

    const updates = Object.keys(req.body)

    const allowedUpdates = ['title', 'description', 'tags', 'body', 'state', 'reading time']
    const isValidOptions = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOptions) {
        return res.status(400).send({error: "invalid updates!!!"})
    }
    try {
 
        const blog = await Blog.findOneAndUpdate({_id: req.params.id, owner: req.user._id}, req.body, {new:true, runValidators:true})
        if(!blog) {
            return res.status(404).send()
        } 
updates.forEach((update) => blog[update] = req.body[update]) 
await blog.save()

        res.status(200).redirect('/')
    }catch(err) { 
        
        res.status(400).send(err)
    }
}

const deleteBlog = async (req, res) => {
    
    try {
    
        const blog = await Blog.findOneAndDelete({_id: req.params.id, owner: req.user._id})
    
        if(!blog) {
            return res.status(404).send("blog not found")
        }
        res.status(200).redirect('/')
    } catch (err) {
        res.status(500).send(err)
    }
}
 

    module.exports = {editBlog, postNewArticle, getAllPublishedBlogs, getBlog, deleteBlog, getAllBlogsByOwner, updateBlogState, editState, getEditBlog }