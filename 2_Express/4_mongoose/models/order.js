const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Order = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product: { type: Object, required: true },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Order", Order);
