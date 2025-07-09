const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is running!', timestamp: new Date().toISOString() });
});

// Google auth routes test
app.post('/api/auth/google/register', (req, res) => {
  console.log('Google register endpoint hit:', req.body);
  res.json({ 
    success: true, 
    message: 'Google register endpoint working',
    data: req.body 
  });
});

app.post('/api/auth/google/login', (req, res) => {
  console.log('Google login endpoint hit:', req.body);
  res.json({ 
    success: true, 
    message: 'Google login endpoint working',
    data: req.body 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Test server running on port ${PORT}`);
  console.log(`✅ Test endpoint: http://localhost:${PORT}/api/test`);
  console.log(`✅ Google register: http://localhost:${PORT}/api/auth/google/register`);
  console.log(`✅ Google login: http://localhost:${PORT}/api/auth/google/login`);
});
