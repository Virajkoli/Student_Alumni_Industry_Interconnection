const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Test credentials - replace with actual user tokens
const USER1_TOKEN = 'your_user1_jwt_token';
const USER2_TOKEN = 'your_user2_jwt_token';

async function testPingSystem() {
  console.log('🧪 Testing Ping System...\n');

  try {
    // Test 1: Send ping request
    console.log('1. Testing send ping request...');
    const sendResponse = await axios.post(
      `${BASE_URL}/students/ping/2`, // Replace with actual target user ID
      {},
      {
        headers: {
          Authorization: `Bearer ${USER1_TOKEN}`,
        },
      }
    );
    console.log('✅ Ping sent successfully:', sendResponse.data);

    // Test 2: Get ping requests
    console.log('\n2. Testing get ping requests...');
    const requestsResponse = await axios.get(
      `${BASE_URL}/students/ping-requests`,
      {
        headers: {
          Authorization: `Bearer ${USER2_TOKEN}`,
        },
      }
    );
    console.log('✅ Ping requests retrieved:', requestsResponse.data);

    // Test 3: Check ping status
    console.log('\n3. Testing ping status check...');
    const statusResponse = await axios.get(
      `${BASE_URL}/students/ping-status/2`, // Replace with actual target user ID
      {
        headers: {
          Authorization: `Bearer ${USER1_TOKEN}`,
        },
      }
    );
    console.log('✅ Ping status:', statusResponse.data);

    // Test 4: Accept ping request (replace requestId with actual ID)
    console.log('\n4. Testing accept ping request...');
    const acceptResponse = await axios.put(
      `${BASE_URL}/students/ping/1/accept`, // Replace with actual request ID
      {},
      {
        headers: {
          Authorization: `Bearer ${USER2_TOKEN}`,
        },
      }
    );
    console.log('✅ Ping accepted:', acceptResponse.data);

    // Test 5: Get connections count
    console.log('\n5. Testing connections count...');
    const countResponse = await axios.get(
      `${BASE_URL}/students/connections/count`,
      {
        headers: {
          Authorization: `Bearer ${USER1_TOKEN}`,
        },
      }
    );
    console.log('✅ Connection count:', countResponse.data);

    // Test 6: Get connections list
    console.log('\n6. Testing connections list...');
    const connectionsResponse = await axios.get(
      `${BASE_URL}/students/connections`,
      {
        headers: {
          Authorization: `Bearer ${USER1_TOKEN}`,
        },
      }
    );
    console.log('✅ Connections list:', connectionsResponse.data);

    console.log('\n🎉 All ping system tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Usage instructions
console.log(`
📋 Ping System Test Instructions:

1. Make sure your backend server is running on port 5000
2. Replace USER1_TOKEN and USER2_TOKEN with actual JWT tokens
3. Replace user IDs (2) and request IDs (1) with actual values
4. Run: node test-ping-system.js

🔧 To get JWT tokens:
- Login through your frontend app
- Check browser dev tools > Application > Local Storage
- Copy the 'token' value

📊 Expected Flow:
1. User 1 sends ping to User 2
2. User 2 receives ping request
3. User 2 accepts ping
4. Both users' connection counts increase
5. Users become connected
`);

// Uncomment to run the test
// testPingSystem();
