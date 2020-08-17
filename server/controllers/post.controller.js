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

exports.addComments = (req, res) => {
    const { postId } = req.params
    const { userName, comment } = req.body
    const comments = {
        userName: userName,
        comment: comment,
        createdAt:new Date().getTime(),
    }
    Post.find({ _id: postId }, (err, post) => {
        if (err) {
            return res.json({
                error:err
            })
        }
        if (post.length===0) {
            return res.json({
                error:"Post does not exist!!"
            })
        }
        Post.updateMany({ _id: postId },{$push: { comments: { $each: [comments], $position: 0 } }, $inc: { comment: 1 } }, (err, __) => {
            if (err) {
                return res.json({
                    error:err
                })
            }
            if (post[0].userName !== userName) {
                const notification = {
                    newNotification:`${userName} has commented on your post`
                }
                User.updateOne({ userName: post[0].userName }, { $push: { notifications: { $each: [notification], $position: 0 } } },(err, user)=> {
                    if (err) {
                        return res.json({
                            error:"Something went wrong!!"
                        })
                    }
                })
            }
            return res.status(200).json({
                message:"Comment saved successfully"
            })
        })
    })

}

exports.likeUnlikePost = (req, res) => {
    const { postId } = req.params
    const { userName } = req.body
    const likedPost = {
        postId:postId
    }
    User.find({ userName:userName,"likedPost.postId": postId }, (err, user) => {
        if (err) {
            return res.json({
                error:"Something went wrong!!"
            })
        }
        if (user.length!==0) {
            User.updateOne({ userName: userName }, { $pull: { likedPost: { postId: postId } } }, (err, user) => {
                if (err) {
                    return res.json({
                        error:"Something went wrong!!"
                    })
                }
                Post.updateOne({ _id: postId }, { $inc: { like: -1 } }, (err, post) => {
                    if (err) {
                        return res.json({
                            error:err
                        })
                    }
                    return res.status(200).json({
                        message:"Like decremented successfully"
                    })
                })
            })
            
        }
        else {
            User.updateOne({ userName: userName }, { $push: { likedPost: likedPost }  } , (err, user) => {
                if (err) {
                    return res.json({
                        error:err
                    })
                }
                Post.find({ _id: postId }, (err, post) => {
                    if (err) {
                        return res.json({
                            error:"Post does not exist!!"
                        })
                    }
                    Post.updateOne({ _id: postId }, { $inc: { like: 1 } }, (err, __) => {
                        if (err) {
                            return res.json({
                                error:"Something went wrong!!"
                            })
                        }
                        if (post[0].userName !== userName) {
                            const notification = {
                                newNotification:`${userName} has liked your post`
                            }
                            User.updateOne({ userName: post[0].userName }, { $push: { notifications: { $each: [notification], $position: 0 } } }, (err, user) => {
                                if (err) {
                                    return res.json({
                                        error:"Something went wrong!!"
                                    })
                                }
                            })
                        }
                        
                        return res.status(200).json({
                            message:"Like incremented successfully"
                        })
                    })
                })
            })
        }
    })
}

exports.deletePost = (req, res) => {
    const { postId } = req.params
    const { userName } = req.body
    Post.findOneAndDelete({ _id: postId }, (err) => {
        if (err) {
            return res.json({
                error:"Something went wrong!!"
            })
        }
        User.updateOne({ userName: userName }, { $pull: { likedPost: { postId: postId } } }, (err, user) => {
            if (err) {
                return res.json({
                    error:"Something went wrong!!"
                })
            }
        })
        return res.status(200).json({
            message:"Deleted successfully"
        })
    })
}