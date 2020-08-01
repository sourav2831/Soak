const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")
const userRoutes = require("./server/routes/user.route")
require("dotenv").config()
const app = express()

const { NODE_PORT, DATABASE_URL,NODE_ENV } = process.env

const PORT = NODE_PORT || 3000
const isDevelopment = NODE_ENV === "development"

app.set("view engine", "ejs")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

if (isDevelopment) {
  app.use(morgan("dev"))
}
else {
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
    app.use("/api",userRoutes)
    app.listen(PORT, () => {
      console.log(`DB connected and the server is runnning at ${PORT}-${NODE_ENV}`);
    });
  })
  .catch((err) => {
    console.error("Db connection failed", err);
  });
