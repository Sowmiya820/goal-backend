const Goal = require('../models/Goal');
const User = require('../models/User');
const Achievement = require('../models/Achievement');
// Create a Goal
const createGoal = async (req, res) => {
    const { title, description, deadline } = req.body;

    try {
        const newGoal = new Goal({
            user: req.user.id,  // From the authMiddleware
            title,
            description,
            deadline
        });

        await newGoal.save();
        res.status(201).json({ message: 'Goal created successfully', goal: newGoal });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update Goal (Completion, Feedback, Points)
const updateGoalStatus = async (req, res) => {
    const { goalId } = req.params;
    const { status, points, feedback } = req.body;

    try {
        const goal = await Goal.findById(goalId).populate('user');
        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        goal.status = status;
        goal.points = points;
        goal.feedback = feedback;

        if (status === 'completed') {
            goal.completedAt = new Date(); // Set completed time
            // Add points to user's total points
            goal.user.points += points;
            await goal.user.save();
        }

        await goal.save();
        res.status(200).json({ message: 'Goal updated successfully', goal });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get User's Goals (Dashboard)
const getUserGoals = async (req, res) => {
    try {
        const userId = req.user.id;  // From authMiddleware
        const goals = await Goal.find({ user: userId }).populate('user');
        res.status(200).json(goals);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


// DELETE Goal and MOVE to Achievements
const deleteGoal = async (req, res) => {
    const { goalId } = req.params;

    try {
        const goal = await Goal.findById(goalId);
        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        // Ensure goal belongs to the authenticated user
        if (goal.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Move to Achievement collection
        const achievement = new Achievement({
            user: goal.user,
            title: goal.title,
            description: goal.description,
            points: goal.points || 0,
            deadline: goal.deadline,
            completedAt: goal.completedAt || new Date(),
            feedback: goal.feedback || "Deleted before completion"
        });

        await achievement.save();
        await goal.deleteOne();

        res.status(200).json({ message: 'Goal deleted and added to achievements', achievement });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createGoal, updateGoalStatus, getUserGoals, deleteGoal };
