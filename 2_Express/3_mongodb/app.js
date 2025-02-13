const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const { MongoConnect } = require("./util/database");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// handle server, if user exist
app.use((req, res, next) => {
  User.fetchById("67ab5d7e1ffe4acc3e78e418")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

MongoConnect((client) => {
  app.listen(3000, () =>
    console.log(`server is listening on http://localhost:3000`)
  );
});
