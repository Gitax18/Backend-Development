const mongodb = require("mongodb");
const { getDb } = require("../util/database");

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    if (id) this.id = new mongodb.ObjectId(id); // for profile updates
  }

  save() {
    const db = getDb();
    let dbOperation;
    if (this.id) {
      dbOperation = db
        .collection("users")
        .updateOne({ _id: this.id }, { $set: this });
    } else {
      dbOperation = db.collection("users").insertOne(this);
    }
    return dbOperation.catch((err) => console.error("Error saving user:", err));
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map((item) => item.productId);
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((item) => {
          const itemQuantity = this.cart.items.find(
            (cartItem) => cartItem.productId.toString() === item._id.toString()
          ).quantity;
          return { ...item, quantity: itemQuantity };
        });
      });
  }

  addToCart(product) {
    const db = getDb();
    const existProductIndex = this.cart.items.findIndex(
      (cartProduct) =>
        cartProduct.productId.toString() == product._id.toString() // toString is compulsory, casue one is string "cartProduct.productId" and another is string
    );
    let updatedCart = [...this.cart.items];
    let newQuantity = 1;

    // If items exists
    if (existProductIndex >= 0) {
      // update the quantity
      newQuantity = this.cart.items[existProductIndex].quantity + 1;
      // update the cart with new quantity
      updatedCart[existProductIndex].quantity = newQuantity;
    } //else, if items not exist
    else {
      updatedCart.push({
        productId: new mongodb.ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    // update the cart and push updates to database
    const updatedCartFinal = {
      items: updatedCart,
    };
    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this.id) },
        { $set: { cart: updatedCartFinal } }
      );
  }

  removeFromCart(productId) {
    const db = getDb();
    const updatedCart = this.cart.items.filter(
      (item) => item.productId.toString() != productId.toString()
    );

    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this.id) },
        { $set: { cart: { items: updatedCart } } }
      );
  }

  addOrderFromCart() {
    const db = getDb();
    return this.getCart().then((products) => {
      const order = {
        user: {
          _id: new mongodb.ObjectId(this.id),
          name: this.name,
        },
        items: products,
      };

      return db
        .collection("orders")
        .insertOne(order)
        .then((result) => {
          return db
            .collection("users")
            .updateOne(
              { _id: new mongodb.ObjectId(this.id) },
              { $set: { cart: { items: [] } } }
            );
        });
    });
  }

  getOrder() {
    const db = getDb();
    return db
      .collection("orders")
      .find({ "user._id": new mongodb.ObjectId(this.id) })
      .toArray();
  }

  static fetchById(id) {
    const db = getDb();
    return db.collection("users").findOne({ _id: new mongodb.ObjectId(id) });
  }
}

module.exports = User;
