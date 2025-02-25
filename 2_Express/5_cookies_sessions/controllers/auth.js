exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").split(";")[0].split("=")[1];
  console.log(req.session);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login Form",
    isAuthenticated: true,
  });
};

exports.postLogin = (req, res, next) => {
  req.session.isLogIn = true;
  res.redirect("/");
};
