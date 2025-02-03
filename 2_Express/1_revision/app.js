const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/add-product", (req, res, next) => {
  res.send(
    `<form action="/product" method="POST"><input type="text" name="name"><input type="submit" value="submit"></form>`
  );
});

app.use("/product", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  res.send(`<h1>This is HOME Page</h1>`);
});

app.listen(3000);
