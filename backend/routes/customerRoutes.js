const express = require("express");
const Customer = require("../models/Customer");

const router = express.Router();

// POST: Add a new customer
router.post("/", async (req, res) => {
  const { name, email, phone, address, total_spending, visits, last_visit } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const customer = new Customer({ name, email, phone, address, total_spending, visits, last_visit });
    await customer.save();
    res.status(201).json({ message: "Customer added successfully", customer });
  } catch (error) {
    console.error("Error saving customer:", error.message);
    res.status(500).json({ error: "Failed to add customer" });
  }
});

// GET: Fetch all customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error.message);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
});

module.exports = router;
