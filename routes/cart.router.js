const express = require("express");
const router = express.Router();
const { Cart } = require("../models/cart.model")
const { Product } = require("../models/product.model")

router.route('/')
  .get(async (req, res) => {
    try {
      const product = await Cart.find().populate('_id')
      const normalizeCartItems = product.map((item) => {
        const { _id, ...doc } = item._id._doc;
        return { id: _id, ...doc, qty: item.qty };
      });
      res.json(normalizeCartItems);
    } catch (err) {
      res.status(501).json({ success: false, message: "unable to get cart", errorMessage: err.message })
    }
  })
  .post(async (req, res) => {
    try {
      const product = req.body
      const { _id, qty } = product
      const newProd = new Cart({ _id, qty });
      await newProd.save();
      res.json({ message: "added in cart", newProd })
    } catch (err) {
      res.status(501).json({ success: false, message: "unable to get cart", errorMessage: err.message })
    }
  })

router.route("/:productId")
.post(async (req, res) => {
  try{
    const { qty } = req.body;
    const { productId } = req.params;
    await Cart.findByIdAndUpdate(productId, {qty});
    res.json({ qty });
  } catch(err){
    res.json({errmsg: err.message})
  }
})  

.delete(async (req, res) => {
    try {
      const { productId } = req.params
      await Cart.findByIdAndDelete(productId);
      res.json({ message: "Deleted" })
    }
    catch(err){
      res.status(404).json({ success: "Deletion failed" })
    }
  })


module.exports = router