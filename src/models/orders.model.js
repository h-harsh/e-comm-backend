const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const OrdersSchema = mongoose.Schema({
  orders: [
    {
      orderId: {
        type: String,
        default: uuidv4(),
      },
      date: {
        type: Date,
        default: Date.now(),
      },
      totalAmount: Number,
      products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    },
  ],
});

const Orders = mongoose.model("Orders", OrdersSchema);

module.exports = { Orders };
