// Simple script to verify route registration
const express = require('express');
const app = express();

// Mock the necessary imports
jest.mock('./config/database', () => ({
  User: {},
  Student: {},
  College: {}
}));
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'mock-token')
}));

// Import the GitHub auth routes
const githubAuthRoutes = require('./routes/github-auth');

// Mount the routes
app.use('/api', githubAuthRoutes);

// Print all registered routes
console.log('GitHub routes registered on /api:');
app._router.stack.forEach(middleware => {
  if (middleware.name === 'router') {
    middleware.handle.stack.forEach(handler => {
      if (handler.route) {
        const path = handler.route.path;
        const methods = Object.keys(handler.route.methods).join(', ');
        console.log(`${methods.toUpperCase()} /api${path}`);
      }
    });
  }
});

// Test the GitHub callback route specifically
const callbackRoute = app._router.stack
  .filter(middleware => middleware.name === 'router')
  .flatMap(middleware => middleware.handle.stack)
  .find(handler => handler.route && handler.route.path === '/auth/github/callback');

console.log('\nGitHub callback route registered:', callbackRoute ? 'Yes' : 'No');
if (callbackRoute) {
  console.log('Full path:', '/api/auth/github/callback');
  console.log('Methods:', Object.keys(callbackRoute.route.methods).join(', ').toUpperCase());
}

// Test if the debug routes endpoint was added
const debugRoutesExists = app._router.stack
  .some(middleware => middleware.route && middleware.route.path === '/api/debug/routes');

console.log('\nDebug routes endpoint registered:', debugRoutesExists ? 'Yes' : 'No');

// Test the structure of the final URL
const REDIRECT_URI = "https://scaips-backend.onrender.com/api/auth/github/callback";
console.log('\nConfigured redirect URI:', REDIRECT_URI);
console.log('URI components:');
const url = new URL(REDIRECT_URI);
console.log('- Protocol:', url.protocol);
console.log('- Host:', url.hostname);
console.log('- Path:', url.pathname);

// Provide recommendations
console.log('\nRecommendations:');
console.log('1. Make sure your GitHub OAuth App settings use exactly this callback URL:');
console.log('   ' + REDIRECT_URI);
console.log('2. Verify the frontend is using the correct GitHub authorization URL');
console.log('3. Check network requests when initiating GitHub auth flow');
console.log('4. Ensure your backend server is running and accessible at', url.origin);
