const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Apply authMiddleware to protect this route
router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Access granted!", user: req.user });
});

module.exports = router;
