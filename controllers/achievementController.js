const Achievement = require('../models/Achievement');

const getUserAchievements = async (req, res) => {
  try {
    // First try user ID from token
    let userId = req.user?.id;

    // If no user ID from token, try from URL param
    if (!userId) {
      userId = req.params.userId;
    }

    if (!userId) {
      return res.status(400).json({ message: 'User ID not found in token or parameters' });
    }

    const achievements = await Achievement.find({ user: userId });
    res.status(200).json(achievements);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUserAchievements };
