const authMiddleware = (req, res, next) => {
    const { user } = req;
  
    if (!user) {
      return res.status(401).json({ error: "Unauthorized access" });
    }
  
    next();
  };
  
  module.exports = authMiddleware;
  