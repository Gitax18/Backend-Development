const mongodb = require("mongodb");
require("dotenv").config();

const MongoClient = mongodb.MongoClient;

let _db;

const getDb = () => {
  if (_db) {
    return _db;
  }

  throw new Error("Database not found !!!!");
};

function MongoConnect(cb) {
  MongoClient.connect(process.env.MONGODB_CONNECTION)
    .then((client) => {
      console.log("Databse connected successfully\n");
      _db = client.db("node_shop");
      cb();
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

exports.MongoConnect = MongoConnect;
exports.getDb = getDb;
