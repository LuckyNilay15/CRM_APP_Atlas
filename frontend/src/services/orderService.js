import axios from "axios";
import API_BASE_URL from "../apiConfig";

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/orders`, orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const fetchOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/orders`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};
