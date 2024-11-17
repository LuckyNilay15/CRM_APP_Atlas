import axios from "axios";
import API_BASE_URL from "../apiConfig";

export const createCampaign = async (campaignData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/campaigns`, campaignData);
    return response.data;
  } catch (error) {
    console.error("Error creating campaign:", error);
    throw error;
  }
};

export const fetchCampaigns = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/campaigns`);
    return response.data;
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    throw error;
  }
};

export const sendMessages = async (campaignId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/campaigns/send`);
    return response.data;
  } catch (error) {
    console.error("Error sending messages:", error);
    throw error;
  }
};
