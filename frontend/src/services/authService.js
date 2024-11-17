import axios from "axios";
import API_BASE_URL from "../apiConfig";

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const logoutUser = () => {
  // Optional: Add logout logic (e.g., clearing tokens or session)
  console.log("User logged out");
};
