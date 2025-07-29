const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const { upload, updateUser } = require('../controllers/authController');

// Register & Login
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

// Update Profile
// Use upload middleware for single file upload named 'profilePicture'
router.put('/update', authMiddleware, upload.single('profilePicture'), updateUser);

// Logout
router.post('/logout', authMiddleware, authController.logoutUser);

module.exports = router;