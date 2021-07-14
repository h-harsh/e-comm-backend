const mongoose = require("mongoose");

const UserData = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cartData : [
    {
      product: {type: Schema.Types.ObjectId, ref: 'Product' },
      qty: {
        type: Number,
        default: 1
      }
    }
  ],
  wishlistData : [ {type: Schema.Types.ObjectId, ref: 'Product' } ],
  
});

const UserData = mongoose.model("UserData", UserDataSchema);

module.exports = { UserData };
