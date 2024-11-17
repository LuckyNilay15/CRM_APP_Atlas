import React, { useEffect, useState } from "react";
import { fetchCampaigns } from "../services/campaignService";
import "./styles/CampaignHistory.css";

const CampaignHistory = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const data = await fetchCampaigns();
        setCampaigns(data);
      } catch (error) {
        console.error("Failed to load campaigns:", error);
      }
    };

    loadCampaigns();
  }, []);

  return (
    <div>
      <h1>Campaign History</h1>
      <table>
        <thead>
          <tr>
            <th>Campaign Name</th>
            <th>Audience Name</th>
            <th>Audience Size</th>
            <th>Total Sent</th>
            <th>Total Failed</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign._id}>
              <td>{campaign.name}</td>
              <td>{campaign.audience_id?.name || "N/A"}</td>
              <td>{campaign.audience_id?.audience_size || 0}</td>
              <td>{campaign.stats?.total_sent || 0}</td>
              <td>{campaign.stats?.total_failed || 0}</td>
              <td>
                {campaign.created_at
                  ? new Date(campaign.created_at).toLocaleString()
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CampaignHistory;
