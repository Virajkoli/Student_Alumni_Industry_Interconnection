const testBackend = async () => {
  console.log('🧪 Testing backend connection...\n');
  
  try {
    const response = await fetch('http://localhost:5000/api/test');
    const data = await response.json();
    console.log('✅ Backend is running!');
    console.log('Response:', data);
  } catch (error) {
    console.log('❌ Backend is not running or not accessible');
    console.log('Error:', error.message);
    console.log('\n🔧 To fix this:');
    console.log('1. Open a new terminal/command prompt');
    console.log('2. Navigate to: f:\\Pallavi Data\\Internship\\Student_Alumni_Industry_Interconnection\\Backend');
    console.log('3. Run: npm start');
    console.log('4. Wait for "Server running on port 5000" message');
    console.log('5. Then test your Google authentication');
  }
};

testBackend();
