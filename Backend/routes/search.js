// routes/search.js
const express = require('express');
const router = express.Router();

// Import the search controller
const { searchUsers } = require('../controllers/searchController');

// Uncomment this line if you have authentication middleware
// const authMiddleware = require('../middleware/auth');

// Search users route
// If you have auth middleware, use: router.get('/users', authMiddleware, searchUsers);
router.get('/users', searchUsers);

// Test route to verify the route is working
router.get('/test', (req, res) => {
  res.json({ message: 'Search route is working!' });
});

module.exports = router;