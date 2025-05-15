const User = require('../models/User');

// Get User's Profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // From authMiddleware
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ name: user.name, email: user.email, points: user.points });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update User's Feedback (For achievement)
const updateUserFeedback = async (req, res) => {
    const { feedback } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.feedback = feedback; // Update feedback
        await user.save();

        res.status(200).json({ message: 'Feedback updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getUserProfile, updateUserFeedback };
