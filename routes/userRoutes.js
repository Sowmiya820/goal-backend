const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');
const { upload, updateUser } = require('../controllers/authController');

// GET /api/user/profile (Get User's Profile)
router.get('/profile', authMiddleware, userController.getUserProfile);

router.put('/update', authMiddleware, upload.single('profilePicture'), updateUser);

// PUT /api/user/feedback (Update User's Feedback)
router.put('/feedback', authMiddleware, userController.updateUserFeedback);
router.get('/notifications', authMiddleware,userController.getNotifications);
// router.put('/notifications/read', authMiddleware, userController.markNotificationsAsRead); // optional
router.put('/notifications/:id/read', authMiddleware, userController.markNotificationAsRead);
router.put('/notifications/read', authMiddleware, userController.markAllNotificationsAsRead);



module.exports = router;
