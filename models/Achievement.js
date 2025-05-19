const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: String,
    description: String,
    goal: String, // ✔️ Goal title reference
    category: String, // ✔️ Add category field
    points: {
        type: Number,
        default: 0
    },
    deadline: Date,
    completedAt: Date,
    feedback: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Achievement', achievementSchema);
