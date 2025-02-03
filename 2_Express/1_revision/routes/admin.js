const express = require("express");

const Router = express.Router();

Router.get("/add-product", (req, res, next) => {
  res.send(
    `<form action="/product" method="POST"><input type="text" name="name"><input type="submit" value="submit"></form>`
  );
});

Router.post("/product", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = Router;
