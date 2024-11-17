const kafka = require("../config/kafka");
const Customer = require("../models/Customer");

const consumer = kafka.consumer({ groupId: "customer-group" });

async function consumeCustomerData() {
  await consumer.connect();
  await consumer.subscribe({ topic: "customer-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = JSON.parse(message.value.toString());
      try {
        console.log("Processing customer data:", data); // Debug log
        await Customer.create(data); // Save data to MongoDB
        console.log("Customer saved successfully.");
      } catch (error) {
        console.error("Error saving customer to MongoDB:", error.message);
      }
    },
  });
}

consumeCustomerData();
