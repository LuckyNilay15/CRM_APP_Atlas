const app = require("./app");
const {databaseConnection} = require("./config/db");

// Initialize database connections
(async () => {
  try {
    await Promise.all([databaseConnection]);
    console.log("Both databases connected successfully.");

    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error("Failed to connect to databases:", err.message);
    process.exit(1); // Exit the application if database connection fails
  }
})();
