const mongodb = require("mongodb");

const { getDb } = require("../util/database");

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    if (id) this._id = new mongodb.ObjectId(id);
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOperation;
    if (this._id) {
      // id exist: Update the product
      dbOperation = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      // id not exit: Save the product
      dbOperation = db.collection("products").insertOne(this);
    }
    return dbOperation.catch((err) =>
      console.error("error Product save(): " + err)
    );
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((res) => {
        return res;
      })
      .catch((err) => console.error("Error finding products: ", err));
  }

  static fetchById(id) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(id) })
      .next()
      .then((product) => {
        return product;
      })
      .catch((err) => console.error("Error fetching data by id: ", err));
  }

  static deleteById(id) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(id) })
      .then((res) => res)
      .catch((err) => console.error("Error deleting product: ", err));
  }
}

// const Product = sequelize.define("product", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false,
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

module.exports = Product;
