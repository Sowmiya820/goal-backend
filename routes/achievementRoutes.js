const express = require('express');
const router = express.Router();
const { getUserAchievements } = require('../controllers/achievementController');
const authMiddleware = require('../middleware/authMiddleware');

// Option 1: Use authMiddleware and no param
// router.get('/achievements', authMiddleware, getUserAchievements);

// Option 2: Allow param without authMiddleware
router.get('/achievements/:userId', getUserAchievements);

// Option 3: You can combine — protect with auth but allow param as fallback
// router.get('/achievements/:userId?', authMiddleware, getUserAchievements);

module.exports = router;
