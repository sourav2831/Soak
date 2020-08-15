const express = require("express")
const mongoose = require("mongoose")
const path = require('path');
const crypto = require("crypto")
const conn = mongoose.createConnection(process.env.DATABASE_URL,{
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useNewUrlParser: true,
});
const multer = require("multer");
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const { getPosts } = require("../controllers/post.controller")
const Post = require("../models/post.model")
const User = require("../models/user.model")
const router = express.Router();

let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

const storage = new GridFsStorage({
  url: process.env.DATABASE_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage,
  fileFilter,
});
router.post('/user/post', upload.single('myImage'), (req, res) => {
  const { caption, userName } = req.body
  User.findOne({ userName: userName }, (err,user) => {
      if (err) {
        return err;
    }
    if (!user) {
      return res.status(404).json({
        error: "User does not exist",
      });
    }
    const post = new Post({
      caption: caption,
      userName: userName,
      createdAt: new Date().getTime(), 
      imageName: req.file.filename,
  })
  post.save((err, postData) => {
      if (err) {
          return res.json({ 
              error:err
          })
      }
      return res.json({
          message:"Post saved successfully"
      })
  })
});
  })

router.get("/user/get", getPosts)


module.exports = router