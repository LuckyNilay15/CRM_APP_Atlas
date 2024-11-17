const mongoose = require("mongoose");
const { databaseConnection } = require("../config/db");

const communicationLogSchema = new mongoose.Schema({
  campaign_id: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign" },
  audience_id: { type: mongoose.Schema.Types.ObjectId, ref: "Audience" },
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  message: { type: String, required: true },
  status: { type: String, enum: ["SENT", "FAILED"], default: "SENT" },
  delivery_receipt_id: { type: mongoose.Schema.Types.ObjectId, ref: "DeliveryReceipt" },
  created_at: { type: Date, default: Date.now },
},
{ timestamps: true }
);

module.exports = databaseConnection.model("CommunicationLog", communicationLogSchema);
