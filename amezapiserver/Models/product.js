const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: {type: Number},
  name: {type: String},
  description: {type: String},
  avtar: {type: String},
  avtar2: {type: String},
  avtar3: {type: String},
  price: {type: Number},
  ISBN: {type: String},
  author: {type: String},
  categories: {type: String},
  quantity: {type: Number},
  createdAt: {type: Date},
  createdBy: {type: String},
  isActive: {type: Boolean}
});

module.exports = mongoose.model("products", productSchema);