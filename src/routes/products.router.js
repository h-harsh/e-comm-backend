const express = require("express");
// const {extend} = require('lodash')
const router = express.Router();
const { Product } = require("../models/product.model")

router.route("/")
.get(async (req, res) => {
  try {
    const products = await Product.find({});
  res.json({ success: true, products })
  } catch (err) {
    res.status(500).json({ success: false, message: "unable to get products", errorMessage: err.message })
  }
  
})
.post(async (req, res) => {
  try {
    const product = req.body;
    const NewProduct = new Product(product);
    const savedProduct = await NewProduct.save();
    res.json({ success: true, product: savedProduct })
  } catch (err) {
    res.status(500).json({ success: false, message: "unable to add products", errorMessage: err.message})
  }
})


router.param("productId", async(req, res, next, id) => {
  try{
    const product = await Product.findById(id);
    if(!product){
      return res.status(400).json({success: "failed empty prod"})
    }
    req.product = product
    next()
  } catch {
    res.status(404).json({success: "failed by error" })
  }
})


router.route("/:productId")
.get((req, res) => {
  const {product} = req
res.send({success: "contsss", product: product})
})
.post(async (req, res) => {
  const newProduct = req.body
  let {product} = req
  product = extend(product, newProduct)
  product = await product.save()
  res.json({success: true, product})
})
.delete(async (req, res) =>{
  let {product} = req
 await product.remove()
  res.json({success: true, product})
})


module.exports = router