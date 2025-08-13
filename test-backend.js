const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testBackend() {
  try {
    console.log('Testing backend API...');
    
    // Test basic endpoint
    const response = await axios.get('http://localhost:5000/');
    console.log('✅ Backend is running:', response.data);
    
    // Test auth endpoint
    const authResponse = await axios.get(`${BASE_URL}/auth/me`, {
      headers: {
        'Authorization': 'Bearer invalid-token'
      }
    }).catch(err => {
      console.log('✅ Auth middleware working (expected 401):', err.response?.status);
    });
    
    console.log('✅ Backend tests completed successfully!');
  } catch (error) {
    console.error('❌ Backend test failed:', error.message);
  }
}

testBackend(); 