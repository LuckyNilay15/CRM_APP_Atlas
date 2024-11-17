import axios from "axios";
import API_BASE_URL from "../apiConfig";

export const createCustomer = async (customerData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/customers`, customerData);
    return response.data;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};

export const fetchCustomers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};
  // Fetch delivery receipts
export const fetchDeliveryReceipts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/communications/receipts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching delivery receipts:", error);
    throw error;
  }
};

// Fetch communication logs
export const fetchCommunicationLogs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/communications/logs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching communication logs:", error);
    throw error;
  }
};
