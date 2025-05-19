const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const goalController = require('../controllers/goalController');

// POST /api/goals (Create a Goal)
router.post('/goals', authMiddleware, goalController.createGoal);

// PUT /api/goals/:goalId (Update Goal Status, Points, and Feedback)
router.put('/goals/:goalId', authMiddleware, goalController.updateGoalStatus);

// GET /api/goals (Get All Goals for Logged-in User)
router.get('/goals', authMiddleware, goalController.getUserGoals);
// DELETE /api/goals/:goalId (Delete Goal & Move to Achievements)
router.delete('/goals/:goalId', authMiddleware, goalController.deleteGoal);


module.exports = router;
