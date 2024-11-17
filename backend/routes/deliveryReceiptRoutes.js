const express = require("express");
const { updateDeliveryReceipt } = require("../controllers/deliveryReceiptController");

const router = express.Router();

router.put("/:id", updateDeliveryReceipt); // Endpoint to update delivery receipt

module.exports = router;
