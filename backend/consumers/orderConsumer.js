const kafka = require("../config/kafka");
const Order = require("../models/Order");

const consumer = kafka.consumer({ groupId: "order-group" });

async function consumeOrderData() {
  await consumer.connect();
  await consumer.subscribe({ topic: "order-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = JSON.parse(message.value.toString());
      try {
        await Order.create(data);
        console.log("Order saved:", data);
      } catch (error) {
        console.error("Error saving order:", error.message);
      }
    }
  });
}

consumeOrderData();
