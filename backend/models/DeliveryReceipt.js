const mongoose = require("mongoose");
const { databaseConnection } = require("../config/db");
const deliveryReceiptSchema = new mongoose.Schema({
  //audience_id: { type: mongoose.Schema.Types.ObjectId, ref: "Audience" },
  communication_log_id: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the CommunicationLog document
    ref: "CommunicationLog",
  },
  //customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  status: { type: String, enum: ["SENT", "FAILED"], default: "SENT" },
  created_at: { type: Date, default: Date.now },
});
// deliveryReceiptSchema.index({ communication_log_id: 1 });
// deliveryReceiptSchema.index({ status: 1 });

module.exports = databaseConnection.model("DeliveryReceipt", deliveryReceiptSchema);
