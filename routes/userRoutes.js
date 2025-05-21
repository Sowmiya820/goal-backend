const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// GET /api/user/profile (Get User's Profile)
router.get('/profile', authMiddleware, userController.getUserProfile);

// PUT /api/user/feedback (Update User's Feedback)
router.put('/feedback', authMiddleware, userController.updateUserFeedback);
router.get('/notifications', authMiddleware,userController.getNotifications);

module.exports = router;
