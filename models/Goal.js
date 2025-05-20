const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: String,
    description: String,
    category: {
        type: String,
        enum: ['Health', 'Career', 'Education', 'Fitness', 'Personal', 'Other'],
        required: true
    },
    points: {
        type: Number,
        default: 0
    },
    deadline: Date,
    completedAt: Date,
    feedback: String,
    status: {
        type: String,
        enum: ['pending', 'ongoing', 'completed'],
        default: 'pending'
    },
      isDeleted: {     // <--- Add this field for soft delete
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Goal', goalSchema);
