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

module.exports = class Product {
  constructor(author, image, description) {
    this.author = author;
    this.image = image;
    this.description = description;
  }

  save() {
    posts.push(this);
  }

  static fetchAll() {
    return posts;
  }
};
