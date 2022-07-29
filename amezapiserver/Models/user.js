const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String },
  userName: { type: String },
  gender: { type: String },
  mob: { type: String },
  password: { type: String },
  isActive: { type: Boolean},
  createdAt: { type: Date}
});

module.exports = mongoose.model("users", userSchema);