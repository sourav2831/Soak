const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
    imageName: {
        type: String,
      },
      imageData: {
          type: String,
      },
    caption: {
        type: String,
        max: 300,
    },
    userName: {
        type: String,
        required:true,
        trim: true,
    },
    createdAt:{
        type: String,
    }
})

module.exports=model("Post",PostSchema)