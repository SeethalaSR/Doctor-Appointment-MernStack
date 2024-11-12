const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(" ")[1];  // Get token from Authorization header
  console.log("Token:", token);  // Check if token is retrieved

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);  // Verify the token with the secret
    req.userId = decoded.id;  // Attach the user data from the token to the request
    console.log("User ID attached to request:", req.userId);  // Log the userId for verification
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};


module.exports = authMiddleware;
