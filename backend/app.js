const express = require("express");
const cors = require("cors");

const customerRoutes = require("./routes/customerRoutes");
const orderRoutes = require("./routes/orderRoutes");
const audienceRoutes = require("./routes/audienceRoutes");
const campaignRoutes = require("./routes/campaignRoutes");
const communicationRoutes = require("./routes/communicationRoutes");
const deliveryReceiptRoutes = require("./routes/deliveryReceiptRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/audiences", audienceRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/communications", communicationRoutes);
app.use("/api/delivery-receipts", deliveryReceiptRoutes);

module.exports = app;
