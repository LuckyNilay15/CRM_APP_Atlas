import React, { useState, useEffect } from "react";
import { fetchCampaigns } from "../services/campaignService";
import "./styles/StatsPage.css";

const StatsPage = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const response = await fetchCampaigns(); // Fetch campaigns from the backend
        setCampaigns(response);
      } catch (error) {
        console.error("Failed to load campaigns:", error.message);
      }
    };
    loadCampaigns();
  }, []);

  return (
    <div className="container">
      <h1>Campaign Stats</h1>
      <table>
        <thead>
          <tr>
            <th>Campaign Name</th>
            <th>Audience Size</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign, index) => (
            <tr key={index}>
              <td>{campaign.name}</td>
              <td>{campaign.audience_size || 0}</td> {/* Safeguard against undefined */}
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

export default StatsPage;
