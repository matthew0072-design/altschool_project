 const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema ({
    title: {
        type: String,
        unique: true,
        required: true
    },

    description: {
        type: String,

    },

    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    state: { 
        type: String,
        enum: {
            values: ['draft','published'],
            message: '{VALUE} is not supported',
        },
        default: "draft"
    },

    read_count: {  
        type: Number,
        default: 0
    },

    reading_time: {
        type:String,
    },

    tags: [String],
    
    body: {
        type: String,
        required: true
    },
    

},
{
    timestamps: true
},
)

blogSchema.methods.toJSON = function () {
    let obj = this.toObject();
    delete obj._id;
    return obj
};

const Blog = mongoose.model("Blog", blogSchema)

  module.exports = Blog;