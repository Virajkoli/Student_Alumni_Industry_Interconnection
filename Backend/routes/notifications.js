const express = require("express");
const { auth } = require("../middleware/auth");
const router = express.Router();

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
router.get("/", auth, (req, res) => {
  res.json({
    success: true,
    message: "Notifications feature coming soon",
    data: {
      notifications: [],
    },
  });
});

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
router.put("/:id/read", auth, (req, res) => {
  res.json({
    success: true,
    message: "Mark as read feature coming soon",
  });
});

module.exports = router;
