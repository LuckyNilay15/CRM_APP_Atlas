const DeliveryReceipt = require("../models/DeliveryReceipt");
const Customer = require("../models/Customer");

const updateDeliveryReceipt = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Status is required" });
  }
  const validStatuses = ["SENT", "FAILED"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: `Invalid status. Allowed values are: ${validStatuses.join(", ")}` });
  }
  try {
    const receipt = await DeliveryReceipt.findByIdAndUpdate(
      id,
      { status, updated_at: new Date() },
      { new: true }
    );

    if (!receipt) {
      return res.status(404).json({ error: "Delivery receipt not found" });
    }

    res.status(200).json({ message: "Delivery receipt updated successfully", receipt });
   
  } catch (error) {
    console.error("Error updating delivery receipt:", error.message);
    res.status(500).json({ error: "Failed to update delivery receipt" });
  }
};

module.exports = { updateDeliveryReceipt };
