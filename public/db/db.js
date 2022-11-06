const mongoose = require("mongoose")
require('dotenv').config()



if (process.env.NODE_ENV === "test") {
  mongoose.connection.close()
}else {
  mongoose.connect(`${process.env.DB_CONNECT}`, {
    useNewUrlParser: true,
    
    useUnifiedTopology: true,
    
  }) 
  mongoose.connection.on("error", err => {
    console.log("err", err)
  })
  mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected")
  })   
  
}


