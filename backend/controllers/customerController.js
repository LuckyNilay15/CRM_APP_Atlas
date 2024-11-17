const Customer = require("../models/Customer");

const createCustomer = async (req, res) => {
  const { name, email, phone, address } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const customer = new Customer({ name, email, phone, address });
    await customer.save();
    res.status(201).json({ message: "Customer created successfully", customer });
  } catch (error) {
    res.status(500).json({ error: "Failed to create customer" });
  }
};

module.exports = { createCustomer };
