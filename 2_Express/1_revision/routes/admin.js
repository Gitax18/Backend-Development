const express = require("express");
const path = require("path");
const Router = express.Router();

Router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "addProduct.html"));
});

Router.post("/add-product", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = Router;
