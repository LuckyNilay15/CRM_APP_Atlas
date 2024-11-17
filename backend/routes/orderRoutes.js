const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// POST: Add a new order
router.post("/", async (req, res) => {
  const { customer_id, order_date, amount, status } = req.body;

  if (!customer_id || !order_date || !amount) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const order = new Order({ customer_id, order_date, amount, status });
    await order.save();
    res.status(201).json({ message: "Order added successfully", order });
  } catch (error) {
    console.error("Error saving order:", error.message);
    res.status(500).json({ error: "Failed to add order" });
  }
});

// GET: Fetch all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find(); // Without populate
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;
