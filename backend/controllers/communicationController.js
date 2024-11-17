const CommunicationLog = require("../models/CommunicationLog");
const DeliveryReceipt = require("../models/DeliveryReceipt");
const Customer = require("../models/Customer");
const Campaign = require("../models/Campaign");
const calculatePercentages = (totalSent, totalFailed) => {
  const totalMessages = totalSent + totalFailed;
  const percentageSent = totalMessages > 0 ? (totalSent / totalMessages) * 100 : 0;
  const percentageFailed = totalMessages > 0 ? (totalFailed / totalMessages) * 100 : 0;

  return { percentageSent, percentageFailed };
};

const sendMessages = async (req, res = null) => {
  const campaign_id = req.body?.campaign_id;

  if (!campaign_id) {
    if (res) res.status(400).json({ error: "Campaign ID is required" });
    throw new Error("Campaign ID is required");
  }

  try {
    // Fetch the campaign and associated audience
    const campaign = await Campaign.findById(campaign_id).populate("audience_id");
    if (!campaign) {
      if (res) res.status(404).json({ error: "Campaign not found" });
      throw new Error("Campaign not found");
    }

    const audienceCriteria =
      typeof campaign.audience_id.criteria === "string"
        ? JSON.parse(campaign.audience_id.criteria)
        : campaign.audience_id.criteria;

    const customers = await Customer.find(audienceCriteria);

    let totalSent = 0;
    let totalFailed = 0;

    for (const customer of customers) {
      const status = Math.random() > 0.1 ? "SENT" : "FAILED";
      const personalizedMessage = campaign.message_template.replace("[Name]", customer.name);

      const communicationLog = await CommunicationLog.create({
        campaign_id: campaign._id,
        audience_id: campaign.audience_id._id,
        customer_id: customer._id,
        message: personalizedMessage,
        status,
      });

      const deliveryReceipt = await DeliveryReceipt.create({
        communication_log_id: communicationLog._id,
        status,
      });

      communicationLog.delivery_receipt_id = deliveryReceipt._id;
      await communicationLog.save();

      if (status === "SENT") totalSent++;
      else totalFailed++;
    }

    campaign.stats = {
      audience_size: customers.length,
      total_sent: totalSent,
      total_failed: totalFailed,
    };
    await campaign.save();

    if (res) {
      res.status(200).json({
        message: "Messages sent successfully",
        stats: { total_sent: totalSent, total_failed: totalFailed },
      });
    }

    return {
      stats: { total_sent: totalSent, total_failed: totalFailed },
    };
  } catch (error) {
    console.error("Error sending messages:", error.message);
    if (res) res.status(500).json({ error: "Failed to send messages" });
    else throw error;
  }
};

const getDeliveryReceipts = async (req, res) => {
  try {
    const campaigns = await Campaign.find()
      .populate("audience_id", "name audience_size")
      .select("name audience_id stats created_at")
      .sort({ created_at: -1 }); // Most recent first

    const receipts = campaigns.map((campaign) => {
      const { total_sent, total_failed, audience_size } = campaign.stats || {};
      const { percentageSent, percentageFailed } = calculatePercentages(
        total_sent || 0,
        total_failed || 0
      );

      return {
        campaign_name: campaign.name,
        audience_size: campaign.audience_id?.audience_size || 0, 
        percentage_sent: percentageSent.toFixed(2),
        percentage_failed: percentageFailed.toFixed(2),
        updated_at: campaign.updated_at || campaign.created_at,
      };
    });

    res.status(200).json(receipts);
  } catch (error) {
    console.error("Error fetching delivery receipts:", error.message);
    res.status(500).json({ error: "Failed to fetch delivery receipts" });
  }
};
const getCommunicationLogs = async (req, res) => {
  try {
    // Fetch communication logs with associated details
    const logs = await CommunicationLog.find()
      .populate("campaign_id", "name") // Include campaign name
      .populate("audience_id", "name audience_size") // Populate audience details
      .populate("customer_id", "name email") // Populate customer details
      .populate({
        path: "delivery_receipt_id",
        select: "status updated_at", // Include status and timestamp from DeliveryReceipt
      })
      .sort({ "delivery_receipt_id.created_at": -1 })
      .exec();
      const formattedLogs = logs.map((log) => ({
        _id: log._id,
        campaign_name: log.campaign_id?.name || "N/A",
        audience_name: log.audience_id?.name || "N/A",
        customer_name: log.customer_id?.name || "N/A",
        message: log.message || "N/A",
        delivery_status: log.delivery_receipt_id?.status || "Pending",
        date: log.delivery_receipt_id?.created_at || log.created_at, 
      }));
  
      res.status(200).json(formattedLogs);
  } catch (error) {
    console.error("Error fetching communication logs:", error.message);
    res.status(500).json({ error: "Failed to fetch communication logs" });
  }
};
module.exports = { sendMessages, getDeliveryReceipts, getCommunicationLogs};
