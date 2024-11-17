const mongoose = require("mongoose");
const { databaseConnection } = require("../config/db");

const audienceSchema = new mongoose.Schema({
  name: { type: String, required: true },        // Audience name
  criteria: { type: Object, required: true },   // Criteria as an object
  audience_size: { type: Number, default: 0 },  // Size of the audience
  created_at: { type: Date, default: Date.now },// Timestamp of creation
});

module.exports = databaseConnection.model("Audience", audienceSchema);
