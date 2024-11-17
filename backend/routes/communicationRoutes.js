const express = require("express");
const { sendMessages, getDeliveryReceipts, getCommunicationLogs,} = require("../controllers/communicationController");

const router = express.Router();

// Route to send messages
router.post("/send", sendMessages);

// Route to get delivery receipts
router.get("/receipts", getDeliveryReceipts);

// Route to get communication logs
router.get("/logs", getCommunicationLogs);

module.exports = router;
