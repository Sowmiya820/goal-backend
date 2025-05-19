const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Register & Login
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

// Update Profile
router.put('/update', authMiddleware, authController.updateUser);

// Logout
router.post('/logout', authMiddleware, authController.logoutUser);

module.exports = router;
