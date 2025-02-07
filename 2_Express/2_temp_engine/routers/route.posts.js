const express = require("express");
const {
  Home,
  ControlError,
  AddPost,
  HandlePost,
} = require("../controllers/controller.posts");

const Router = express.Router();

console.log(Home);

Router.get("/", Home);

Router.get("/create-post", AddPost);

Router.post("/create-post", HandlePost);

Router.get("/*", ControlError);

module.exports = Router;
