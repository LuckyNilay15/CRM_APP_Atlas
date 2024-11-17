const express = require("express");
const {
  createCampaign,
  getCampaigns,
  sendMessagesForCampaign,
} = require("../controllers/campaignController");

const router = express.Router();

// Route to create a new campaign
router.post("/", createCampaign);

// Route to fetch all campaigns
router.get("/", getCampaigns);

// Route to send messages for a specific campaign
router.post("/:id/send", sendMessagesForCampaign);

module.exports = router;
