const express = require("express");
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
router.post('/image-upload', upload.single('myImage'), (req, res) => {
  const { userName } = req.body
  User.findOne({ userName: userName }, (err,user) => {
      if (err) {
        return err;
    }
    if (!user) {
      return res.status(404).json({
        error: "User does not exist",
      });
    }
    User.updateOne({ userName: userName }, { $set: { imageName: req.file.filename } }, (err, user) => {
        if (err)
        return res.status(400).json({
          error: err,
        });
        return res.status(200).json({
            success: true,
            document: user, 
          });
      })
  });
  })


module.exports = router;