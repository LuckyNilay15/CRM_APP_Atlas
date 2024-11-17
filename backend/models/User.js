const mongoose = require("mongoose");
const { databaseConnection } = require("../config/db");
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  picture: String,
  created_at: { type: Date, default: Date.now },
});

module.exports = databaseConnection.model("User", userSchema);
