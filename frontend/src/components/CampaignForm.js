import React, { useState, useEffect } from "react";
import { fetchAudiences } from "../services/audienceService";
import { createCampaign } from "../services/campaignService";
import "./styles/CampaignForm.css";

const CampaignForm = () => {
  const [name, setName] = useState("");
  const [messageTemplate, setMessageTemplate] = useState("");
  const [audiences, setAudiences] = useState([]);
  const [selectedAudience, setSelectedAudience] = useState("");
  const [stats, setStats] = useState(null); // For displaying stats after message sending

  // Load audience list
  useEffect(() => {
    const loadAudiences = async () => {
      try {
        const response = await fetchAudiences();
        setAudiences(response);
      } catch (error) {
        console.error("Failed to fetch audiences:", error.message);
      }
    };
    loadAudiences();
  }, []);

  // Submit the campaign and send messages
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createCampaign({
        name,
        audience_id: selectedAudience,
        message_template: messageTemplate,
      });
      // Extract stats from the response
      setStats(response.stats);
      alert("Campaign created and messages sent successfully!");

      // Reset form fields
      setName("");
      setMessageTemplate("");
      setSelectedAudience("");
    } catch (error) {
      console.error("Error creating campaign or sending messages:", error.message);
      alert("Failed to create campaign or send messages.");
    }
  };

  return (
    <div className="campaign-form-container">
      <h1>Create Campaign</h1>
      <form onSubmit={handleSubmit} className="campaign-form">
        <div className="form-group">
          <label htmlFor="campaignName">Campaign Name:</label>
          <input
            type="text"
            id="campaignName"
            placeholder="Enter campaign name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="messageTemplate">Message Template:</label>
          <textarea
            id="messageTemplate"
            placeholder="Enter your message template. Use [Name] to personalize."
            value={messageTemplate}
            onChange={(e) => setMessageTemplate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="audienceSelect">Select Audience:</label>
          <select
            id="audienceSelect"
            value={selectedAudience}
            onChange={(e) => setSelectedAudience(e.target.value)}
            required
          >
            <option value="">-- Select an Audience --</option>
            {audiences.map((audience) => (
              <option key={audience._id} value={audience._id}>
                {audience.name} (Size: {audience.audience_size || 0})
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-button">
          Create Campaign
        </button>
      </form>

      {/* Display campaign stats after creation */}
      {stats && (
        <div className="campaign-stats">
          <h2>Campaign Stats</h2>
          <p><strong>Total Audience:</strong> {stats.audience_size}</p>
          <p><strong>Total Sent:</strong> {stats.total_sent}</p>
          <p><strong>Total Failed:</strong> {stats.total_failed}</p>
        </div>
      )}
    </div>
  );
};

export default CampaignForm;
