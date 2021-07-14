const express = require('express')
const router = express.Router()
const {UserData} = require('../models/userData.model')
const { authVerify} = require('../utls/authVerify')

router.route('/')
.get(authVerify, async(req, res) => {
    const {userId} = req.user
    const {productId} = req.params
    const userData = await UserData.findOne({ userId: userId }).populate({
        path:'wishlistData',
        model: 'Product'
    })
    res.json({status: "success", Wishlist: userData.wishlistData})
})

router.route('/:productId')
.post(authVerify, async(req, res) => {
    const {userId} = req.user
    const {productId} = req.params
    const userData = await UserData.findOne({ userId: userId });
    userData.wishlistData.push(productId)
    await userData.save();
    res.json({status:"added to wishlist", Wishlist: userData.wishlistData})
})
.delete(authVerify, async(req, res) => {
    const {userId} = req.user
    const {productId} = req.params
    const userData = await UserData.findOne({userId: userId})
    userData.wishlistData.map(item => {
        if(item == productId){
            userData.wishlistData.pull(item)
        }
    })
    await userData.save()
    res.json({status:" removed from wishlist", wishlist: userData.wishlistData })
})

module.exports = router