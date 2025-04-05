const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Look for the token in cookies first or in the authorization header
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication failed!" });
  }

  try {
    // Decode the token to get user data (e.g., userId)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user info to the request object
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
