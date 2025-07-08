const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testMyPosts() {
  try {
    // First, let's try to login to get a valid token
    const loginResponse = await fetch('https://scaips-backend.onrender.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'student@example.com',
        password: 'password123'
      })
    });

    const loginData = await loginResponse.json();
    console.log('Login response:', loginData);

    if (loginData.success && loginData.token) {
      // Now test the my-posts endpoint
      const postsResponse = await fetch('https://scaips-backend.onrender.com/api/posts/my-posts?limit=5', {
        headers: {
          'Authorization': `Bearer ${loginData.token}`,
          'Content-Type': 'application/json',
        }
      });

      const postsData = await postsResponse.json();
      console.log('My posts response:', JSON.stringify(postsData, null, 2));
    }
  } catch (error) {
    console.error('Test error:', error);
  }
}

testMyPosts();
