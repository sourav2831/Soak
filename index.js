const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")
const methodOverride = require('method-override');
const userRoutes = require("./server/routes/user.route")
const postRoutes = require("./server/routes/post.route")
const imageRoutes = require("./server/routes/image.route")
require("dotenv").config()
const app = express()

const { NODE_PORT, DATABASE_URL,NODE_ENV } = process.env

const PORT = process.env.PORT || NODE_PORT
const isDevelopment = NODE_ENV === "development"

app.set("view engine", "ejs")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

if (isDevelopment) {
  app.use(morgan("dev"))
}
else {
  app.use(express.static("client/build"))
  app.use(morgan("combined"))
}
if (isDevelopment) {
  // production
  // app.use(cors({ origin: CLIENT_URL, optionsSuccessStatus: 200 }));
  app.use(cors());
}

mongoose
  .connect(DATABASE_URL, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.use("/api", userRoutes)
    app.use("/api", postRoutes)
    app.use("/api", imageRoutes)
    if(process.env.NODE_ENV=="production"){
      app.use(express.static('client/build'))
      const path = require('path')
      app.get("*",(req,res)=>{
          res.sendFile(path.resolve(__dirname,'client','build','index.html'))
      })
  }
    app.listen(PORT, () => {
      console.log(`DB connected and the server is runnning at ${PORT}-${NODE_ENV}`);
    });
  })
  .catch((err) => {
    console.error("Db connection failed", err);
  });
