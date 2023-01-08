const jwt = require("jsonwebtoken");
const User = require('../models/userSchema')
require("dotenv").config()


const Auth = async (req, res, next) => {
  try {
    // const token = req.header('Authorization').replace('Bearer ', '') || req.cookies.token
    const token = req.cookies.token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    
    const user = await User.findOne({_id: decodedToken._id})

    if(!user) {
      throw new Error()
    }

    req.user = user  
    next()
  }
  catch (err) {
    res.status(401).redirect('/login')
  }  
}

 
// const Auth = (req, res, next) => {
//     const token = req.cookies.token

//     if (token) {
//       jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
//         if (err) {
//           console.log(err.message);
//           res.redirect('/login');
//         } else {
//           console.log(decodedToken);
//           next();
//         }
//       });
//     } else {
//       res.redirect('/login');
//     }   
// }


const checkUser =  (req, res, next) => {
  
    const token = req.cookies.token
  
    if(token) {

      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
      
          res.locals.user = null
          next()
        }
        else {
                  
          let user = await User.findById(decodedToken._id)
          
         res.locals.user = user
        
          next() 
          
        }
       } )
    
    } else {
      res.locals.user = null
      next()
    }
    
    
  }

  


module.exports =  { Auth, checkUser }; 