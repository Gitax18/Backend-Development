exports.getLogin = (req, res, next) => {
  console.log(req.session.isLogIn);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login Form",
    isAuthenticated: req.session.isLogIn,
  });
};

exports.postLogin = (req, res, next) => {
  req.session.isLogIn = true;
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    console.log("session destroyed");
    res.redirect("/");
  });
};
