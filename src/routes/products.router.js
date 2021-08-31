const express = require("express");
const router = express.Router();
const { Product } = require("../models/product.model");

router.route("/").get(async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "unable to get products",
        errorMessage: err.message,
      });
  }
});

// to fetch a single product
router.route("/:productId").get(async (req, res) => {
  try {
    const { productId } = req.params;
    const currentProduct = await Product.findById(productId)
    res.json({ currentProduct });
  } catch (error) {
    res.json({error:error.message})
    console.log({"error message from fetching product by id":error.message})
  }
});

module.exports = router;
