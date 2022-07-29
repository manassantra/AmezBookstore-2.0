const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  uid: {type : String},
  addressType: {type : String},
  addressLine1: {type : String},
  addressLine2: {type : String},
  city: {type : String},
  town: {type : String},
  state: {type : String},
  pinCode: {type : Number},
  country: {type : String},
  createdAt: {type : Date},
  createdBy: {type : String},
  isActive: {type : Boolean}
});

module.exports = mongoose.model("address", addressSchema);