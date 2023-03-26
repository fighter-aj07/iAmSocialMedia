const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postRoutes = require("./routes/posts");
const userdataRoutes = require("./routes/userdata");
const profileRoutes = require("./routes/profile");
const loginRoutes = require("./routes/login");
const signupRoutes = require("./routes/signup");
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
}); //cors error

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

app.use("/posts", postRoutes);
app.use("/userdata", userdataRoutes);
app.use("/profile", profileRoutes);
app.use("/login", loginRoutes);
app.use("/signup", signupRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

const dbUrl =
  "mongodb+srv://meetjain:meetjain@iamsocialmedia.drwlypm.mongodb.net/test";

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5002);
  })
  .catch((err) => {
    console.log(err);
  });
