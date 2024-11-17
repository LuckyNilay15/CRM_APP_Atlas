const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "data-ingestion-api",
  brokers: ["localhost:9092"]
});

module.exports = kafka;
