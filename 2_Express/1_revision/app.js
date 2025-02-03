const express = require("express");
const http = require("http");

const app = express();

app.use((req, res, next) => {
  console.log("You are in the middle ware 1");
  next();
});

app.use((req, res, next) => {
  console.log("In another middleware ");
  res.send({ name: "gitanshu" });
});

app.listen(3000);
