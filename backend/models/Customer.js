const mongoose = require("mongoose"); 
const { databaseConnection } = require("../config/db");

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  total_spending: Number,
  visits: Number,
  last_visit: { type: Date, default: Date.now },
});

module.exports = databaseConnection.model("Customer", customerSchema);
