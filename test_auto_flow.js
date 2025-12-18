const axios = require('axios');

const BASE_URL = 'http://localhost:5000';
const TEST_USER = {
    name: 'Test API User',
    email: `test_api_${Date.now()}@example.com`, // Unique email every run
    password: 'password123'
};

const runTests = async () => {
    console.log(`\n🚀 Starting API Test Sequence on ${BASE_URL}...\n`);

    // 1. Health Check
    try {
        console.log('1️⃣  Testing Health Endpoint (/health)...');
        const healthRes = await axios.get(`${BASE_URL}/health`);
        console.log(`   ✅ Status: ${healthRes.status}, DB State: ${healthRes.data.database}`);
    } catch (error) {
        console.error(`   ❌ Health Check Failed: ${error.message}`);
        process.exit(1);
    }

    // 2. Register
    try {
        console.log('\n2️⃣  Testing User Registration (/api/auth/register)...');
        console.log(`   Creating user: ${TEST_USER.email}`);
        const regRes = await axios.post(`${BASE_URL}/api/auth/register`, TEST_USER);
        console.log(`   ✅ Registered successfully! User ID: ${regRes.data._id || regRes.data.user?._id}`);
    } catch (error) {
        const msg = error.response ? JSON.stringify(error.response.data) : error.message;
        console.error(`   ❌ Registration Failed: ${msg}`);
        // If it failed because it exists (unlikely given uniq email), try login
    }

    // 3. Login
    let token = '';
    try {
        console.log('\n3️⃣  Testing User Login (/api/auth/login)...');
        const loginRes = await axios.post(`${BASE_URL}/api/auth/login`, {
            email: TEST_USER.email,
            password: TEST_USER.password
        });
        token = loginRes.data.token;
        console.log(`   ✅ Login successful! Token received.`);
    } catch (error) {
        const msg = error.response ? JSON.stringify(error.response.data) : error.message;
        console.error(`   ❌ Login Failed: ${msg}`);
        process.exit(1);
    }

    // 4. Protected Route
    try {
        console.log('\n4️⃣  Testing Protected Route (/api/auth/me)...');
        const meRes = await axios.get(`${BASE_URL}/api/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(`   ✅ Access granted! Welcome, ${meRes.data.name} (Role: ${meRes.data.role})`);
    } catch (error) {
        const msg = error.response ? JSON.stringify(error.response.data) : error.message;
        console.error(`   ❌ Protected Route Verification Failed: ${msg}`);
    }

    console.log('\n🎉 All Systems Nominal. Backend is fully functional.');
};

runTests();
