const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed', 'archived'],  // Added archived status
        default: 'pending'
    },
    points: {  // Add points to track goal achievement
        type: Number,
        default: 0,
    },
    feedback: {  // Feedback to show appreciation for goal achievement
        type: String,
    },
    completedAt: {  // Track completion time
        type: Date,
    },
    deadline: {
        type: Date,
        validate: {
            validator: (value) => !value || value > Date.now(), // Future date validation
            message: 'Deadline must be a future date'
        }
    }
}, {
    timestamps: true
});

// Optional Index for user field
goalSchema.index({ user: 1 });

module.exports = mongoose.model('Goal', goalSchema);
