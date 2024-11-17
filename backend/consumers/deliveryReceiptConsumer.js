const kafka = require("../config/kafka");
const DeliveryReceipt = require("../models/DeliveryReceipt");

const deliveryReceiptConsumer = async () => {
  const consumer = kafka.consumer({ groupId: "delivery-group" });

  await consumer.connect();
  await consumer.subscribe({ topic: "delivery-receipt-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = JSON.parse(message.value.toString());
      try {
        await DeliveryReceipt.create(data);
        console.log("Delivery receipt logged:", data);
      } catch (error) {
        console.error("Error logging delivery receipt:", error.message);
      }
    },
  });
};

module.exports = deliveryReceiptConsumer;
