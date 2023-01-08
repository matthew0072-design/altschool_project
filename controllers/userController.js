 const User = require("../models/userSchema")


const loginUser = async (req, res) => {
    
  try {
        const user = await User.findByDetails(req.body.email, req.body.password )
       const token = await user.generateToken()
       res.cookie('token', token, {maxAge: 60 * 60 * 1000})
      res.status(200).redirect('/');
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }  

  };
   
  



const newUser =  async(req, res) => {
    
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let password =  req.body.password
    
    try {
      const user = await new User({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password
      })  

      await user.save()
      const token = await user.generateToken() 
      res.cookie('token', token, {maxAge: 60 * 60 * 1000})
      res.status(201).redirect('/');

       
      
   }catch(err){
    
      res.status(500).send(err)
   }
  
     
  };
   

const logoutUser = async (req, res) => {

  res.cookie('token', '', {maxAge: 1})
  res.redirect('/')
} 


module.exports =  {
    
    newUser,
    loginUser,
    logoutUser
};