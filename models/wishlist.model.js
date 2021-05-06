const mongoose = require("mongoose");
const { Schema } = mongoose;

const WishListSchema = new mongoose.Schema({
  _id: {type: Schema.Types.ObjectId, ref: 'Product'}
})

const WishList = mongoose.model("WishList", WishListSchema);

module.exports = { WishList }