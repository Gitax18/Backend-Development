const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const Routes = require("./routers/route.posts");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(Routes);

app.listen(1234, () =>
  console.log("server listening at: http://localhost:1234")
);
