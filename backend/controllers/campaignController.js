const Campaign = require("../models/Campaign");
const CommunicationLog = require("../models/CommunicationLog");
const Customer = require("../models/Customer");
const DeliveryReceipt = require("../models/DeliveryReceipt");
const { sendMessages } = require("./communicationController");
// Controller to create a campaign
const createCampaign = async (req, res) => {
  const { name, audience_id, message_template } = req.body;

  if (!name || !audience_id || !message_template) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Create and save the campaign
    const campaign = new Campaign({ name, audience_id, message_template });
    await campaign.save();

    // Simulate an HTTP request body for sendMessages
    const simulatedReq = { body: { campaign_id: campaign._id.toString() } };
    
    // Call sendMessages directly
    const response = await sendMessages(simulatedReq);

    res.status(201).json({
      message: "Campaign created successfully and messages sent",
      campaign,
      stats: response.stats,
    });
  } catch (error) {
    console.error("Error creating campaign:", error.message);
    res.status(500).json({ error: "Failed to create campaign or send messages" });
  }
};


// Controller to fetch all campaigns
const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find()
      .populate("audience_id", "name audience_size") // Populate audience details
      .select("name audience_id created_at stats") // Select specific fields
      .sort({ created_at: -1 });

    const simplifiedCampaigns = campaigns.map((campaign) => ({
      name: campaign.name,
      audience_size: campaign.audience_id?.audience_size || 0, // Handle undefined audience_id
      created_at: campaign.created_at,
    }));

    res.status(200).json(simplifiedCampaigns);
  } catch (error) {
    console.error("Error fetching campaigns:", error.message);
    res.status(500).json({ error: "Failed to fetch campaigns" });
  }
};

// Controller to send messages for a specific campaign
const sendMessagesForCampaign = async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  try {
    const campaign = await Campaign.findById(id).populate("audience_id");
    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }
    console.log(campaign.audience_id);
    const query =campaign.audience_id.criteria;
    // console.log("hello");
    const customers = await Customer.find(query);

    let totalSent = 0;
    let totalFailed = 0;

    for (const customer of customers) {
      // Randomize delivery status
      const status = Math.random() > 0.1 ? "SENT" : "FAILED";

      const personalizedMessage = campaign.message_template.replace(
        "[Name]",
        customer.name || "Customer"
      );

      // Create communication log entry
      const communicationLog = await CommunicationLog.create({
        campaign_id: campaign._id,
        audience_id: campaign.audience_id._id,
        customer_id: customer._id,
        message: personalizedMessage,
        status,
        created_at: new Date(),
      });

      // Create delivery receipt entry
      await DeliveryReceipt.create({
        communication_log_id: communicationLog._id,
        status,
      });

      // Update sent/failed counts
      if (status === "SENT") {
        totalSent++;
      } else {
        totalFailed++;
      }
    }

    // Update campaign stats
    campaign.stats = {
      audience_size: customers.length,
      total_sent: totalSent,
      total_failed: totalFailed,
    };
    await campaign.save();

    res.status(200).json({
      message: "Messages sent successfully",
      stats: {
        audience_size: customers.length,
        total_sent: totalSent,
        total_failed: totalFailed,
      },
    });
  } catch (error) {
    console.error("Error sending messages:", error.message);
    res.status(500).json({ error: "Failed to send messages" });
  }
};

module.exports = {
  createCampaign,
  getCampaigns,
  sendMessagesForCampaign,
};
