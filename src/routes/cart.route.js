const express = require("express");
const router = express.Router();
const {UserData} = require('../models/userData.model')
const {Product} = require('../models/product.model') 
const { authVerify} = require('../utls/authVerify')

// Load Initial cart
router.get('/', authVerify, async(req, res) => {
    const {userId} = req.user
    const userData = await UserData.findOne({userId: userId}).populate({
        path: 'cartData',
        populate: {
            path:'product',
            model: 'Product'
        } 
    })
    console.log(userData.cartData)
    const normalizedCartData = userData.cartData.map(item => {return {qty: item.qty, ...item.product._doc}})
    res.json({status: "success", cartData: normalizedCartData})
})

router.route('/:productId')
// Add to cart
.post(authVerify, async(req, res) => {
    const {userId} = req.user
    const {productId} = req.params
    const userData = await UserData.findOne({ userId: userId });
    userData.cartData.push({product: productId, qty: 1})
    await userData.save()
    res.json({status: "Added to cart", cart: userData.cartData})
})

// Remove from cart
.delete(authVerify, async(req, res) => {
    const {userId} = req.user
    const {productId} = req.params
    const userData = await UserData.findOne({userId: userId})
    userData.cartData.map(item => {
        if(item.product == productId){
            userData.cartData.pull(item)
        }
    })
    await userData.save()
    res.json({status:" removed from cart",cartData: userData.cartData })
})


router.post('/:productId/inc', authVerify, async(req, res) => {
    const {userId} = req.user
    const {productId} = req.params
    const userData = await UserData.findOne({userId: userId})
      userData.cartData.map(item => {
        console.log(item.product)
        if (item.product == productId) {
          UserData.updateOne(
            { "cartData._id": item._id },
            {
              $set: {
                "cartData.$.qty": item.qty + 1,
              },
            },
            function(err, doc) {
              if (err) {
                console.log(err);
                return res.status(400).send(err)
              }
              res.json({status: "added qty"})
            }
          )
        }
      })
    
})
router.post('/:productId/dec', authVerify, async(req, res) => {
    const {userId} = req.user
    const {productId} = req.params
    const userData = await UserData.findOne({userId: userId})
      userData.cartData.map(item => {
        if (item.product == productId) {
          UserData.updateOne(
            { "cartData._id": item._id },
            {
              $set: {
                "cartData.$.qty": item.qty - 1,
              },
            },
            function(err, doc) {
              if (err) {
                console.log(err);
                return res.status(400).send(err)
              }
              res.json({status: "subtracted qty"})
            }
          )
        }
      })
    
})
module.exports = router