const mongoose = require("mongoose");
const { databaseConnection } = require("../config/db");

const campaignSchema = new mongoose.Schema({
  name: String, // Name of the campaign
  audience_id: { type: mongoose.Schema.Types.ObjectId, ref: "Audience" }, // Linked audience
  message_template: String, // Template for the message (e.g., "Hi [Name], get 10% off!")
  stats: {
    audience_size: { type: Number, default: 0 }, // Total size of the audience
    total_sent: { type: Number, default: 0 }, // Total messages sent
    total_failed: { type: Number, default: 0 }, // Total messages failed
  },
  created_at: { type: Date, default: Date.now }, // Campaign creation timestamp
});

module.exports = databaseConnection.model("Campaign", campaignSchema);
