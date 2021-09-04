const mongoose = require("mongoose");

const AddressSchema = mongoose.Schema({
  addresses: [
    {
      fullName: {
        type: String,
        required: "Name is Required",
        minLength: 6,
        maxLength: 200,
      },
      pinCode: {
        type: Number,
        required: "Please enter Pincode",
      },
      buildingName: {
        type: String,
        required: "House no./Building name is Required",
      },
      area: {
        type: String,
        required: "Area/Locality details are Required",
        minLength: [6, 'Locality Too Short']
      },
      landmark: String,
      city: {
        type: String,
        required: "City name is Required",
        minLength: 3,
      },
      state: {
        type: String,
        required: "State Name is Required",
      },
    },
  ],
});

const Address = mongoose.model("Address", AddressSchema);

module.exports = { Address };
