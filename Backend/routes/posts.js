const express = require("express");
const { auth } = require("../middleware/auth");
const router = express.Router();

// @desc    Get all posts
// @route   GET /api/posts
// @access  Private
router.get("/", auth, (req, res) => {
  res.json({
    success: true,
    message: "Posts feature coming soon",
    data: {
      posts: [],
    },
  });
});

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
router.post("/", auth, (req, res) => {
  res.json({
    success: true,
    message: "Post creation feature coming soon",
  });
});

module.exports = router;
