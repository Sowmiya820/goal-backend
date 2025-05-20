const Achievement = require('../models/Achievement');

const getUserAchievements = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from the JWT middleware

    const achievements = await Achievement.find({ user: userId });

    res.status(200).json(achievements);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUserAchievements };
