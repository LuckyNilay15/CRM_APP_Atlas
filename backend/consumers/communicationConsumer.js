const kafka = require("../config/kafka");
const CommunicationLog = require("../models/CommunicationLog");

const communicationConsumer = async () => {
  const consumer = kafka.consumer({ groupId: "communication-group" });

  await consumer.connect();
  await consumer.subscribe({ topic: "communication-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = JSON.parse(message.value.toString());
      try {
        await CommunicationLog.create(data);
        console.log("Communication log saved:", data);
      } catch (error) {
        console.error("Error saving communication log:", error.message);
      }
    },
  });
};

module.exports = communicationConsumer;
