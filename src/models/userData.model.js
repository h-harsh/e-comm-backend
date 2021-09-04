const mongoose = require("mongoose");

const UserDataSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cartData: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      qty: {
        type: Number,
        default: 1,
      },
    },
  ],
  wishlistData: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Orders" }],
  
});

const UserData = mongoose.model("UserData", UserDataSchema);

module.exports = { UserData };
