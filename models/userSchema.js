const mongoose =  require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { Schema } = mongoose;

const userSchema = new Schema(
    {
      first_name: {
        type: String,
        required: true,

      },
      last_name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
      },

      password: {
        type: String,
        required: true,
      },
      tokens : [{
        token: {
          type: String,
          required: true
        }
      }],
      
    },
    {
      toJSON: { virtuals: true},
      toObject: { virtuals: true}
    }
    
  );

  userSchema.statics.findByDetails = async (email, password) => {
    const user = await User.findOne({email})
    if(!user) {
      throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compareSync(password, user.password)
    
    if(!isMatch) {
      throw new Error('Unable to login')
    }
    return user
  } 

  userSchema.pre("save", function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

userSchema.methods.generateToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET, {expiresIn: '1h'})

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token

}

userSchema.virtual('blogs', {
  ref: 'Blog',
  localField: '_id',
  foreignField: 'author'
})


userSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  delete obj.__id;
  
  return obj
};
  
  const User = mongoose.model("User", userSchema)

  module.exports = User;