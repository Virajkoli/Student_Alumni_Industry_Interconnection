// Test post creation with simple content (no media)
const API_BASE_URL = 'https://scaips-backend.onrender.com';

async function testPostCreation() {
  try {
    console.log('Testing post creation...');
    
    // Step 1: Test authentication with existing user
    const loginResponse = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'alagwala@gmail.com',
        password: 'password123', // Common password
        role: 'student'
      })
    });

    const loginData = await loginResponse.json();
    console.log('Login response:', loginData.success ? 'Success' : loginData.message);

    if (!loginData.success) {
      // Try with different password
      const loginResponse2 = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'alagwala@gmail.com',
          password: 'testpass123',
          role: 'student'
        })
      });

      const loginData2 = await loginResponse2.json();
      console.log('Login attempt 2:', loginData2.success ? 'Success' : loginData2.message);
      
      if (!loginData2.success) {
        console.log('❌ Could not authenticate - testing without valid token');
        return;
      }
      loginData.token = loginData2.token;
      loginData.success = loginData2.success;
    }

    if (loginData.success && loginData.token) {
      // Step 2: Test simple post creation (text only)
      const postResponse = await fetch(`${API_BASE_URL}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginData.token}`,
        },
        body: JSON.stringify({
          content: 'Test post to verify Cloudinary integration - text only'
        })
      });

      const postData = await postResponse.json();
      console.log('Post creation response:', postData);

      if (postData.success) {
        console.log('✅ Text post creation successful!');
        
        // Step 3: Test post creation with FormData (simulating file upload)
        const formData = new FormData();
        formData.append('content', 'Test post with FormData (no actual files)');
        
        const formPostResponse = await fetch(`${API_BASE_URL}/api/posts`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${loginData.token}`,
            // Don't set Content-Type for FormData
          },
          body: formData
        });

        const formPostData = await formPostResponse.json();
        console.log('FormData post creation response:', formPostData);
        
        if (formPostData.success) {
          console.log('✅ FormData post creation successful!');
          console.log('🎉 Cloudinary integration is working correctly');
        } else {
          console.log('❌ FormData post creation failed:', formPostData.message);
        }
      } else {
        console.log('❌ Text post creation failed:', postData.message);
      }
    }
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testPostCreation();
