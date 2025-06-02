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

// // GET /api/dashboard/counts
// router.get('/counts', authMiddleware, async (req, res) => {
//   const userId = req.user.id;  // From auth middleware

//   try {
//     const totalCreated = await Goal.countDocuments({ user: userId });
//     const activeCount = await Goal.countDocuments({ user: userId, isDeleted: false });

//     res.status(200).json({ totalCreated, activeCount });
//   } catch (err) {
//     console.error('Error getting dashboard counts:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
module.exports = router;
                                   