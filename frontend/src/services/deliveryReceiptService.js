import axios from "axios";
import API_BASE_URL from "../apiConfig";

export const updateDeliveryStatus = async (logId, status) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/delivery-receipts`, {
      logId,
      status,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating delivery status:", error);
    throw error;
  }
};
