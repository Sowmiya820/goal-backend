const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Import route files
const authRoutes = require('./routes/authRoutes');
const goalRoutes = require('./routes/goalRoutes');
const userRoutes = require('./routes/userRoutes');
const achievementRoutes = require('./routes/achievementRoutes');
// Initialize express app
const app = express();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors()); // Allow cross-origin requests
// Serve static files in uploads folder for profile pictures
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Use routes
app.use('/api/auth', authRoutes); // Auth routes (login, register)
app.use('/api', goalRoutes); // Goal-related routes (create, update, view)
app.use('/api/user', userRoutes); // User profile and feedback routes
app.use('/api', achievementRoutes);
// MongoDB connection
dotenv.config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
