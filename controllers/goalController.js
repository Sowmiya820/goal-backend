const Goal = require('../models/Goal');
const User = require('../models/User');
const Achievement = require('../models/Achievement');

// Create a Goal
const createGoal = async (req, res) => {
    const { title, description, deadline, category } = req.body;

    try {
        const newGoal = new Goal({
            user: req.user.id,
            title,
            description,
            deadline,
            category
        });

        await newGoal.save();
        res.status(201).json({ message: 'Goal created successfully', goal: newGoal });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
// Update Goal Status
const updateGoalStatus = async (req, res) => {
    const { goalId } = req.params;
    const { status, points, feedback } = req.body;

    try {
        const goal = await Goal.findById(goalId).populate('user');
        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        let newAchievement = null;

        // Update fields
        goal.status = status || goal.status;
        goal.points = points !== undefined ? points : goal.points;
        goal.feedback = feedback || goal.feedback;

        // Handle startedAt
        if (req.body.startedAt) {
            goal.startedAt = req.body.startedAt;
        }

        // If completed, mark as completed and create achievement
        if (status === 'completed') {
            if (!goal.completedAt) goal.completedAt = new Date();

            newAchievement = new Achievement({
                user: goal.user._id,
                title: goal.title,
                description: goal.description,
                goal: goal.title,
                category: goal.category,
                points: points || 0,
                deadline: goal.deadline,
                completedAt: goal.completedAt,
                feedback: feedback || 'Completed goal',
            });

            await newAchievement.save();
        }

        await goal.save();

        res.status(200).json({
            message: 'Goal updated successfully',
            goal,
            achievement: newAchievement || null,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get User's Goals  <---- THIS WAS MISSING
const getUserGoals = async (req, res) => {
    try {
        const userId = req.user.id;
        // Only fetch goals that are NOT deleted
        const goals = await Goal.find({ user: userId, isDeleted: false }).populate('user');
        res.status(200).json(goals);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
// DELETE Goal and Move to Achievement
const deleteGoal = async (req, res) => {
    const { goalId } = req.params;

    try {
        const goal = await Goal.findById(goalId);
        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        if (goal.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Soft delete
        goal.isDeleted = true;
        await goal.save();

        // Return updated goals after deletion
        const updatedGoals = await Goal.find({ user: req.user.id, isDeleted: false });

        res.status(200).json({
            message: 'Goal soft deleted successfully',
            updatedGoals
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};




module.exports = { createGoal, updateGoalStatus, getUserGoals, deleteGoal };
