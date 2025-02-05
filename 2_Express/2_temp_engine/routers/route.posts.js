const express = require("express");
const { Home, ControlError } = require("../controllers/controller.posts");

const Router = express.Router();

console.log(Home);

Router.get("/", Home);

Router.get("/*", ControlError);

module.exports = Router;
