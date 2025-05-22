const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
  message: String,
  type: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  read: {
    type: Boolean,
    default: false
  }
}, { _id: true }); 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    points: {  // Add points to track total points for the user
        type: Number,
        default: 0,
    },
    feedback: {  // Optional: To store any feedback or credits to the user
        type: String,
    },
    profilePicture: {
        type: String,
        default: '',
    },
//  notifications: [
//   {
//     message: String,
//     type: String,
//     createdAt: {
//       type: Date,
//       default: Date.now
//     },
//     read: {
//       type: Boolean,
//       default: false
//     }
    
//   }
// ]

 notifications: [notificationSchema]  // ✅ use the defined sub-schema
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
