const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = (req, res, next) => {
    // Get token from Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // JWT_SECRET should be in your environment variables
        req.user = decoded.user; // Set user info in the request (userId, etc.)
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
