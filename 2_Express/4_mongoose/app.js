const path = require("path");
require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("67b9d808569161ec3a9f2e9b")
    // this user is mongoose Model not JS object.
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect(process.env.MONGODB_CONNECTION).then((res) => {
  User.findOne().then((user) => {
    if (!user) {
      const newUser = new User({
        name: "Gitanshu",
        email: "gitax@mail.com",
        cart: {
          items: [],
        },
      });
      newUser.save();
    }
  });
  app.listen(3001, () => console.log("http://localhost:3001"));
});
