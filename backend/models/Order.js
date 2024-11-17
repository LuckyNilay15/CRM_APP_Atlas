const mongoose = require("mongoose");
const { databaseConnection } = require("../config/db");

const orderSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  order_date: { type: Date, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: "Pending" },
  created_at: { type: Date, default: Date.now },
});

module.exports = databaseConnection.model("Order", orderSchema);
