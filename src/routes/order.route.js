const express = require("express");
const router = express.Router();
const { authVerify } = require("../utls/authVerify");
const { UserData } = require("../models/userData.model");
const {Address} = require('../models/address.model')
const {Orders} = require('../models/orders.model')
const Razorpay = require("razorpay");
const { calculateAmount } = require("../utls/order.util");

const instance = new Razorpay({
  key_id: "rzp_test_K5dH6XBR7bi41N",
  key_secret: "aCz96VHD6GVGVMv9bxPzsTgw",
});

router.route('/')
.get(authVerify, async(req,res) => {
  const {userId} = req.user;
  const userData = await UserData.findOne({userId}).populate({
    path:'orders',
    model:'Orders'
  })
  console.log("Hello")
  res.json({allOrders:userData.orders})
})

router.route("/create").post(authVerify, async (req, res) => {
  const { addressId } = req.body;
  const { userId } = req.user;
// Taking cart data and putting normal 
  const userData = await UserData.findOne({ userId: userId }).populate({
    path: "cartData",
    populate: {
      path: "product",
      model: "Product",
    },
  });
  console.log("1", userData.cartData);
  const normalizedCartData = userData.cartData.map((item) => {
    return { qty: item.qty, ...item.product._doc };
  });
  console.log("2", normalizedCartData)
  
  const userAddress = await Address.findById(userData.address);
  const selectedAddress = userAddress.addresses.filter(item => item._id == addressId) 
  console.log("4", selectedAddress)

  const userOrder = new Orders({amount:calculateAmount(normalizedCartData),paymentStatus:'Not Received' , products:normalizedCartData, address:selectedAddress,})
  await userOrder.save()
  userData.orders.push(userOrder._id)
  await userData.save()
  
  UserData.update({userId:userId}, { $set: { cartData: [] }}, function(err, affected){
    console.log('cart empty done');
});
  
  const amount = calculateAmount(normalizedCartData) * 100;
  const currency = "INR";
  const receipt = userOrder._id.toString();
  const notes = { desc: "your order at FinStore" };
  instance.orders.create(
    { amount, currency, receipt, notes },
    (error, order) => {
      if (error) {
        console.log(error)
        return res.status(500).json(error);
      }
      return res.status(200).json(order);
    }
  );
});

router.route('/placed/:order_id')
.post(authVerify, async(req,res) => {
  const {userId} = req.user;
  const {order_id} = req.params;
  const {orderId, paymentId, signature} = req.body;
  const currentOrder = await Orders.findOneAndUpdate({_id:order_id},{paymentStatus:"Received",orderId, paymentId, signature}, {new: true} )
  res.json({order:currentOrder})
})

module.exports = router;
