const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const { updateUser, upload } = require('../controllers/authController');
// Register & Login
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

// Update Profile
// router.put('/update', authMiddleware, authController.updateUser);
// Use upload middleware for single file upload named 'profilePicture'
router.put('/update', authMiddleware,upload.single('profilePicture'), updateUser);
// Logout
router.post('/logout', authMiddleware, authController.logoutUser);

module.exports = router;
