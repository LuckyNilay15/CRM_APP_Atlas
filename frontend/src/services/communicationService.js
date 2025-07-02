import axios from "axios";
import API_BASE_URL from "../apiConfig";

// Send messages
export const sendMessages = async (campaignId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/communications/send`, { campaign_id: campaignId });
    return response.data;
  } catch (error) {
    console.error("Error sending messages:", error);
    throw error;
  }
};

// Fetch delivery receipts
export const fetchDeliveryReceipts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/communications/receipts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching delivery receipts:", error);
    throw error;
  }
};


export const fetchCommunicationLogs = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/communications/logs`);
  return response.data;
};

