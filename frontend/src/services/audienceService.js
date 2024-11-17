import axios from "axios";
import API_BASE_URL from "../apiConfig"; // Ensure this file contains your backend base URL

export const createAudience = async (name, criteria) => {
  const data = {
    name,
    criteria, // Pass the criteria object directly
  };

  try {
    const response = await axios.post(`${API_BASE_URL}/audiences`, data);
    console.log("Audience created successfully:", response.data);
    return response.data; // Return response for further use in the frontend
  } catch (error) {
    console.error("Error creating audience:", error.response?.data || error.message);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export const fetchAudiences = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/audiences`);
    return response.data;
  } catch (error) {
    console.error("Error fetching audiences:", error.response?.data || error.message);
    throw error;
  }
};
