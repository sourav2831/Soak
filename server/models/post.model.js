const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
    imageName: {
        type: String,
      },
    caption: {
        type: String,
        trim:true,
        max: 300,
    },
    userName: {
        type: String,
        required:true,
        trim: true,
    },
    createdAt:{
        type: String,
    },
    comments: [],
    like: {
        type: Number,
        default:0
    },
    comment: {
        type: Number,
        default:0
    }
})

module.exports=model("Post",PostSchema)