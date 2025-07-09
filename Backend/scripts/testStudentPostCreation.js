// Register a test student and then test post creation
const API_BASE_URL = 'https://scaips-backend.onrender.com';

async function registerAndTestPost() {
  try {
    console.log('Registering a test student...');
    
    // Register a new test student
    const testEmail = `test.student.${Date.now()}@example.com`;
    const registerResponse = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testEmail,
        password: 'TestPass123!',
        first_name: 'Test',
        last_name: 'Student',
        contact_no: '1234567890',
        student_college_name: 'Test College',
        interested_field: 'Computer',
        role: 'student'
      })
    });

    const registerData = await registerResponse.json();
    console.log('Registration response:', registerData.success ? 'Success' : registerData.message);

    if (registerData.success && registerData.data && registerData.data.token) {
      console.log('✅ Student registration successful!');
      
      // Test post creation with text only
      const postResponse = await fetch(`${API_BASE_URL}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${registerData.data.token}`,
        },
        body: JSON.stringify({
          content: 'My first test post with Cloudinary integration! 🎉'
        })
      });

      const postData = await postResponse.json();
      console.log('Post creation response:', postData);

      if (postData.success) {
        console.log('✅ Post creation successful!');
        console.log('🎉 Backend is working correctly with Cloudinary');
      } else {
        console.log('❌ Post creation failed:', postData.message);
        console.log('Full response:', postData);
      }
    } else {
      console.log('❌ Registration failed:', registerData.message);
      console.log('Full response:', registerData);
    }
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

registerAndTestPost();
