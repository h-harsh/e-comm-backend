const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const OrdersSchema = mongoose.Schema({
  amount: Number,
  paymentStatus: String,
  products: [],
  address: {},
  paymentId:String,
  orderId:String,
  signature:String,
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Orders = mongoose.model("Orders", OrdersSchema);

module.exports = { Orders };

// const OrdersSchema = mongoose.Schema({
//   orders: [
//     {
//       amount: Number,
//       paymentStatus:String,
//       products: [],
//       address:String,
//       date: {
//         type: Date,
//         default: Date.now(),
//       }
//     },
//   ],
// });
