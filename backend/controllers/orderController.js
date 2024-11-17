const Order = require("../models/Order");

const getOrders = async (req, res) => {
  try {
    // Fetch all orders with customer details populated
    const orders = await Order.find().populate("customer_id");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

module.exports = { getOrders };
