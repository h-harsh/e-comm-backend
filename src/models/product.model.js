const mongoose = require("mongoose");
const data = require("../db/productsData");

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    author: String,
    publisher: String,
    publishYear: String,
    price: Number,
    discount: Number,
    deliveryCharge: Number,
    inStock: Boolean,
    fastDelivery: Boolean,
    ratings: String,
    offer: String,
    description: String,
    format: String,
    asins: String,
    language: String,
    pages: Number,
    weight: Number,
    bestSellersRank: String,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

// for (let i = 0; i < 11; i++) {
//   const newProd = new Product(data[i]);
//   const savedProd = newProd.save();
//   console.log(savedProd);
// }

module.exports = { Product };
