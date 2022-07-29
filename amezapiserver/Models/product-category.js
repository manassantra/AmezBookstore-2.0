const mongoose = require("mongoose");

const productCategorySchema = new mongoose.Schema({
  id: {type: String},
  categoryName: {type: String},
  categoryDescription: {type: String},
  avtar: {type: String},
  createdAt: {type: Date},
  createdBy: {type: String},
  isActive: {type: Boolean}
});

module.exports = mongoose.model("product-category", productCategorySchema);