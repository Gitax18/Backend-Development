const posts = [
  {
    author: "gitanshu",
    image: "images/1.jpg",
    description: "Created a awesome project",
  },
  {
    author: "nehal",
    image: "images/2.jpg",
    description: "Just completed another freelance work, balance += $1500",
  },
  {
    author: "aakash",
    image: "images/3.jpg",
    description: "Just an image of clean code",
  },
];

exports.Home = function Home(req, res) {
  res.render("home", {
    posts,
  });
};

exports.ControlError = function ControlError(req, res) {
  // first arg: template filename, second arg: object with data for template file.
  res.render("page404", {
    data: "There is some issue in your URL, this page does not exist",
  });
};
