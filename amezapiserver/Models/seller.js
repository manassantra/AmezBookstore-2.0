const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  fullName: { type: String },
  userName: { type: String },
  gender: { type: String },
  mob: { type: String },
  password: { type: String },
  isActive: { type: Boolean},
  createdAt: { type: Date}
});

module.exports = mongoose.model("sellers", sellerSchema);