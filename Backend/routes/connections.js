const express = require("express");
const { auth } = require("../middleware/auth");
const router = express.Router();

// @desc    Get user connections
// @route   GET /api/connections
// @access  Private
router.get("/", auth, (req, res) => {
  res.json({
    success: true,
    message: "Connections feature coming soon",
    data: {
      connections: [],
    },
  });
});

// @desc    Send connection request
// @route   POST /api/connections/request
// @access  Private
router.post("/request", auth, (req, res) => {
  res.json({
    success: true,
    message: "Connection request feature coming soon",
  });
});

module.exports = router;
