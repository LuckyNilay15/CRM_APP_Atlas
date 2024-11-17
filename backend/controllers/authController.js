const { verifyToken } = require("../config/googleAuth");

const login = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    const userData = await verifyToken(token);
    res.status(200).json({ message: "Login successful", user: userData });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { login };
