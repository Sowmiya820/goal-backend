const cron = require('node-cron');
const Goal = require('../models/Goal');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// This task runs every minute to check for upcoming deadlines
cron.schedule('* * * * *', async () => {
  const now = new Date();
  const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

  try {
    // Find goals due within the next hour that haven't been notified yet
    const goals = await Goal.find({
      status: 'ongoing',
      notified: false,
      deadline: { $lte: oneHourLater, $gt: now }
    }).populate('user');

    for (const goal of goals) {
      const user = goal.user;

      // ✅ Send email reminder
      await sendEmail({
        to: user.email,
        subject: `⏰ Upcoming Goal Deadline`,
        text: `Your goal "${goal.title}" is due by ${goal.deadline.toLocaleString()}. Don't forget!`
      });

      // ✅ Mark goal as notified
      goal.notified = true;
      await goal.save();

      // ✅ Push notification to user object
      user.notifications.push({
        message: `Goal "${goal.title}" is due in less than 1 hour!`,
        read: false,
        type: 'reminder',
        createdAt: new Date() // ensure compatibility with frontend time display
      });

      await user.save();
    }
  } catch (err) {
    console.error('Error while processing reminder notifications:', err);
  }
});
