const User = require("../models/userSchema")


const loginUser = async (req, res) => {
    
  try {
        const user = await User.findByDetails(req.body.email, req.body.password )
       const token = await user.generateToken()
      res.status(200).send({user, token});
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }  

  };
  
  



const newUser =  async(req, res) => {
 
    
    try {
      const user = await new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
      })  
      const token = await user.generateToken()
      res.status(201).send({user, token});

       
      
   }catch(err){
    
      res.status(500).send(err)
   }
  
     
  };
   




module.exports =  {
    
    newUser,
    loginUser
};