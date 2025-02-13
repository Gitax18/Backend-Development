const mongodb = require("mongodb");
const { getDb } = require("../util/database");

class User {
  constructor(username, email, id) {
    this.name = username;
    this.email = email;
    if (id) this.id = new mongodb.ObjectId(id);
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

  static fetchById(id) {
    const db = getDb();
    return db.collection("users").findOne({ _id: new mongodb.ObjectId(id) });
  }
}

module.exports = User;
