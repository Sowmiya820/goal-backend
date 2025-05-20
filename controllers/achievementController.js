const Achievement = require('../models/Achievement');

const getUserAchievements = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({ message: 'User ID not found in token' });
    }

    const achievements = await Achievement.find({ user: userId });
    res.status(200).json(achievements);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUserAchievements };
