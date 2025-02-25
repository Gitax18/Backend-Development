exports.getLogin = (req, res, next) => {
  const isLoggedIn = req.get("Cookie").split(";")[0].split("=")[1];
  console.log(isLoggedIn);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login Form",
    isAuthenticated: isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  res.setHeader("set-Cookie", "isLoggedIn=true");
  res.redirect("/");
};
