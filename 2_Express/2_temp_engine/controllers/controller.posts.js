const Post = require("../models/model.post");

exports.Home = function Home(req, res) {
  const posts = Post.fetchAll();
  res.render("home", {
    posts,
  });
};

exports.AddPost = function AddPost(req, res) {
  res.render("addpost");
};

exports.HandlePost = function HandlePost(req, res) {
  const newPost = new Post(
    req.body.author,
    req.body.image,
    req.body.description
  );
  newPost.save();
  res.redirect("/");
};

exports.ControlError = function ControlError(req, res) {
  // first arg: template filename, second arg: object with data for template file.
  res.render("page404", {
    data: "There is some issue in your URL, this page does not exist",
  });
};
