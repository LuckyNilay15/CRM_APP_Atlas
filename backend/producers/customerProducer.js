const kafka = require("../config/kafka");
const producer = kafka.producer();

async function produceCustomerData(data) {
  await producer.connect();
  await producer.send({
    topic: "customer-topic",
    messages: [{ value: JSON.stringify(data) }]
  });
  await producer.disconnect();
}

module.exports = produceCustomerData;
