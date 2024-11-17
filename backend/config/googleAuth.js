const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID = "29241022765-rv4rkrj4anslmuvk5lr2kfndu2lhjbj6.apps.googleusercontent.com"; // Replace with your Google Client ID
const client = new OAuth2Client(CLIENT_ID);

/**
 * Verify Google ID token
 * @param {string} token - ID token from the frontend
 * @returns {Promise<object>} Decoded token payload
 */
const verifyToken = async (token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    });

    const payload = ticket.getPayload(); // Decoded user information
    return payload; // Includes user details like name, email, and picture
  } catch (error) {
    console.error("Error verifying Google token:", error.message);
    throw new Error("Invalid Google token");
  }
};

module.exports = { verifyToken };
