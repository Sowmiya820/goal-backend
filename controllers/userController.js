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

// const getNotifications = async (req, res) => {
//   const user = await User.findById(req.user.id);
//   res.json(user.notifications.reverse());
// };
const getNotifications = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Make sure notifications exists and reverse it
    const notifications = (user.notifications || []).slice().reverse();

    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Server error while fetching notifications' });
  }
};

// const markNotificationsAsRead = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     user.notifications = user.notifications.map(n => ({ ...n._doc, read: true }));
//     await user.save();

//     res.status(200).json({ message: 'All notifications marked as read' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

const markNotificationAsRead = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const notificationId = req.params.id; // notification id from URL param

    // Find the notification by id and update read status
    const notification = user.notifications.id(notificationId);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.read = true; // mark as read
    await user.save();

    res.status(200).json({ message: 'Notification marked as read', notification });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Mark all notifications as read
const markAllNotificationsAsRead = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.notifications.forEach(n => n.read = true);
    await user.save();

    res.status(200).json({ message: 'All notifications marked as read' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { getUserProfile, updateUserFeedback,getNotifications,markNotificationAsRead ,markAllNotificationsAsRead};
