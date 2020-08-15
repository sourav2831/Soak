const Post = require("../models/post.model")
const User = require("../models/user.model")


exports.getPosts = (req, res) => {
    Post.find({},null, { sort: { createdAt: -1 } }, (err, post) => {
        if (err) {
            return res.json({
                error:"Something went wrong!!"
            })
        }
        return res.json({
            posts:post
        })
    })
}

