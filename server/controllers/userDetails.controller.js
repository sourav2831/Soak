const User = require("../models/user.model")

exports.userDetails = (req, res) => {
    const { userName, bio, website, location } = req.body
    User.updateOne({ userName: userName }, { $set: { bio: bio, website: website, location: location } }, (err, user) => {
        if (err) {
            return res.json({
                error:"Something went wrong"
            })
        }
        return res.status(200).json({
            message:"Saved Successfully"
        })
    })  
}
 
exports.userNotifications = (req, res) => {
    const { _id } = req.params
    User.find({_id:_id}).select({ "notifications": 1, "_id": 0}).exec((err, notification) => {
        if (err) {
            return res.json({
                error:"Something went wrong!!"
            })
        }
        return res.json({
            notifications:notification
        })
    })
}