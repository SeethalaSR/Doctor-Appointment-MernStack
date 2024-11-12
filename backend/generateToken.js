require('dotenv').config(); // Load .env variables
const jwt = require('jsonwebtoken');

// Create a token with a sample payload. Replace 'yourUserIdHere' with a real user ID if you have one.
const token = jwt.sign({ user: { userId: 'yourUserIdHere' } }, process.env.JWT_KEY);
console.log("Test Token:", token);
