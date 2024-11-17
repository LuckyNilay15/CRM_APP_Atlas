const express = require("express");
const { createAudience, getAllAudiences } = require("../controllers/audienceController");

const router = express.Router();

// Create a new audience
router.post("/", createAudience);

// Get all audiences
router.get("/", getAllAudiences);

module.exports = router;
