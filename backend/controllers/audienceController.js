const Audience = require("../models/Audience");
const Customer = require("../models/Customer");

// Create a new audience
const createAudience = async (req, res) => {
  const { name, criteria } = req.body;

  // Validate input
  if (!name || !criteria) {
    return res.status(400).json({ error: "Name and criteria are required." });
  }

  try {
    // Parse criteria if it is a string, otherwise use it directly
    const parsedCriteria = typeof criteria === "string" ? JSON.parse(criteria) : criteria;

    // Calculate audience size based on parsed criteria
    const audienceSize = await calculateAudienceSize(parsedCriteria);

    // Create and save the audience document
    const audience = new Audience({
      name,
      criteria: parsedCriteria, // Store criteria as an object
      audience_size: audienceSize,
    });

    await audience.save();

    // Respond with success message and the created audience
    res.status(201).json({ message: "Audience created successfully", audience });
  } catch (error) {
    console.error("Error creating audience:", error.message);
    res.status(500).json({ error: "Failed to create audience" });
  }
};

// Get all audiences
const getAllAudiences = async (req, res) => {
  try {
    const audiences = await Audience.find();
    res.status(200).json(audiences);
  } catch (error) {
    console.error("Error fetching audiences:", error.message);
    res.status(500).json({ error: "Failed to fetch audiences" });
  }
};

// Helper function to calculate audience size based on criteria
const calculateAudienceSize = async (criteria) => {
  try {
    return await Customer.countDocuments(criteria); // Query Customer collection
  } catch (error) {
    console.error("Error calculating audience size:", error.message);
    throw new Error("Failed to calculate audience size.");
  }
};

module.exports = { createAudience, getAllAudiences };
