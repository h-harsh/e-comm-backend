const express = require('express')
const router = express.Router()
const {WishList} = require('../models/wishlist.model')
const {Product} = require('../models/product.model')

router.route('/')
.get(async(req, res) => {
  try{
    const wishItems = await WishList.find().populate('_id')
    const normalizeItems = wishItems.map((item) => {
      const { _id, ...doc } = item._id._doc;
      return { id: _id, ...doc};
      });
    res.json(normalizeItems)
  } catch(err){
    res.json({success: false, error: err.message})
  }
})

router.route('/:productId')
.post(async (req, res) => {
try{
  console.log("post req")
  const {productId} = req.params;
  const savedProduct = new WishList({_id: productId})
  savedProduct.save();
  res.json({success: true, savedProduct})
} catch(err) {
  res.json({success: false, error:  err.message})
}
})
.delete(async (req, res) => {
  try {
    const { productId } = req.params
    await WishList.findByIdAndDelete(productId);
    res.json({ message: "Deleted" })
  } catch{
    res.status(404).json({ success: "failed to delete" })
    }
})


module.exports = router