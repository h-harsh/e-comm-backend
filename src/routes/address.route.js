const express = require("express");
const router = express.Router();
const { authVerify } = require("../utls/authVerify");
const { Address } = require("../models/address.model");
const { UserData } = require("../models/userData.model");

// To fetch all address
router.route("/").get(authVerify, async (req, res) => {
  const { userId } = req.user;
  const currentUser = await UserData.findOne({ userId: userId });
  const addressData = await Address.findById(currentUser.address);
  res.json({
    message: "Address fetched success",
    allAddresses: addressData.addresses,
  });
});
//To add a address
router.route("/new").post(authVerify, async (req, res) => {
  try {
    const { userId } = req.user;
    const { data } = req.body;
    const currentUser = await UserData.findOne({ userId: userId });
    const addressData = await Address.findById(currentUser.address);
    addressData.addresses.push(data);
    await addressData.save();
    res.json({ status: "address added successfully" });
  } catch (error) {
    res.json({ success: "false", message: error.message });
  }
});
//To delete a address
router.route("/remove/:addressId").delete(authVerify, async (req, res) => {
  try {
    const { userId } = req.user;
    const { addressId } = req.params;

    const currentUser = await UserData.findOne({ userId: userId });
    const addressData = await Address.findById(currentUser.address);
    addressData.addresses.map((item) => {
      if (item._id == addressId) {
        addressData.addresses.pull(item);
      }
    });
    await addressData.save();
    res.json({ status: "address deleted successfully" });
  } catch (error) {
    res.json({ success: "false", message: error.message });
  }
});
module.exports = router;
