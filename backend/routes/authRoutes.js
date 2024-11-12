const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found', success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials', success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', success: true, token, user});
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Something went wrong', success: false });
  }
});

module.exports = router;
