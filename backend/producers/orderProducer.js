const kafka = require("../config/kafka");
const producer = kafka.producer();

async function produceOrderData(data) {
  await producer.connect();
  await producer.send({
    topic: "order-topic",
    messages: [{ value: JSON.stringify(data) }]
  });
  await producer.disconnect();
}

module.exports = produceOrderData;
