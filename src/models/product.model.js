const mongoose = require("mongoose");
const products = require('../db/data.js');

const ProductSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  material: String,
  brand: String,
  inStock: Boolean,
  fastDelivery: Boolean,
  ratings: String,
  offer:String,
  idealFor: String,
  color:String 
   },
   { timestamps: true }
   );


const Product = mongoose.model("Product", ProductSchema);

// for(let i=0; i< 50; i++){
//   const newProd = new Product(products[i])
// const savedProd = newProd.save()
// console.log(savedProd)
// }


module.exports = { Product }