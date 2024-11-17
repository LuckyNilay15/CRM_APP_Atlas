const mongoose = require("mongoose");

// Create a single connection for the unified database
const uri="mongodb+srv://Nilay_Namit:12345676@cluster0.kelk2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const databaseConnection = mongoose.createConnection(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Event listeners for the database
databaseConnection.on("connected", () => {
  console.log("Connected to MongoDB: crm_database successfully.");
});
databaseConnection.on("error", (err) => {
  console.error("Error connecting to crm_database:", err.message);
});

// Export the connection to use it in models
module.exports = {
  databaseConnection,
};
