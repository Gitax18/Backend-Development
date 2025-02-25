const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const errorController = require("./controllers/error");
const User = require("./models/user");
const Product = require("./models/product");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("67bd48271216414a5868b1dd")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Max",
          email: "max@test.com",
          cart: {
            items: [],
          },
        });
        user.save();
        const product = new Product({
          title: "Product",
          price: 500,
          description: "A small description of the product",
          imageUrl: "nourl",
          userId: "67bd4663a01ada496ca5ee90",
        });
        product.save();
      }
    });
    app.listen(3000, () =>
      console.log("Application listening on http://localhost:3000")
    );
  })
  .catch((err) => {
    console.log(err);
  });
