/*
 * Quick authentication test for the frontend
 * Run this in the browser console to check authentication state
 */

// Check if there's an authentication token
const token = localStorage.getItem('accessToken');
console.log('🔑 Access Token:', token ? 'Present' : 'Not found');

if (token) {
  console.log('Token preview:', token.substring(0, 20) + '...');
  
  // Try to decode the JWT token (basic decode, don't use in production)
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('👤 Token payload:', payload);
    console.log('📅 Token expires:', new Date(payload.exp * 1000));
    console.log('🕐 Current time:', new Date());
    console.log('✅ Token valid:', payload.exp * 1000 > Date.now());
  } catch (e) {
    console.log('❌ Could not decode token:', e.message);
  }
}

// Check if user is logged in by trying to access profile endpoint
async function testAuth() {
  try {
    const response = await fetch('http://localhost:5000/api/profile/about', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    console.log('🔍 Profile endpoint test:', response.status, data);
    
    if (response.status === 200) {
      console.log('✅ Authentication working!');
    } else if (response.status === 401) {
      console.log('❌ Authentication failed - user needs to log in');
    }
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testAuth();
