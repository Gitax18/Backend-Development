const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.fetchById(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.fetchById(prodId)
    .then((product) => {
      req.user.addToCart(product);
      res.redirect("/cart");
    })
    .catch((err) => console.log("Error in PostCart:", err));
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cart,
      });
    })
    .catch((err) => console.error("Error in getCart: ", err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then((rs) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log("Error in postCartDeleteProduct: ", err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .addOrderFromCart()
    .then((result) => {
      console.log(result);
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

exports.getOrder = (req, res, next) => {
  req.user
    .getOrder()
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};
