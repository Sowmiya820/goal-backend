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

        // Update basic fields
        goal.status = status || goal.status;
        goal.points = points !== undefined ? points : goal.points;
        goal.feedback = feedback || goal.feedback;

        // ONLY declare and save achievement inside this block
        if (status === 'completed') {
            if (!goal.completedAt) goal.completedAt = new Date();

            const achievement = new Achievement({
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

            await achievement.save();  // SAVE here inside block
        }

        if (req.body.startedAt) {
            goal.startedAt = req.body.startedAt;
        }

        await goal.save();

        res.status(200).json({ message: 'Goal updated successfully', goal });
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

        // Instead of deleting, set isDeleted to true (soft delete)
        goal.isDeleted = true;

        // Move to Achievement as before
        const achievement = new Achievement({
            user: goal.user,
            title: goal.title,
            description: goal.description,
            goal: goal.title,
            category: goal.category,
            points: goal.points || 0,
            deadline: goal.deadline,
            completedAt: goal.completedAt || new Date(),
            feedback: goal.feedback || "Deleted before completion"
        });

        await achievement.save();
        await goal.save();  // Save soft delete change instead of deleting the document

        res.status(200).json({ message: 'Goal soft deleted and added to achievements', achievement });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};




module.exports = { createGoal, updateGoalStatus, getUserGoals, deleteGoal };
