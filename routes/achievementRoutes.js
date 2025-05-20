const express = require('express');
const router = express.Router();
const { getUserAchievements } = require('../controllers/achievementController');

// GET /api/achievements/:userId
router.get('/', getUserAchievements);

module.exports = router;
