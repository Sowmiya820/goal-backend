const { body } = require('express-validator');

// 🚀 User Registration Validation
const validateRegister = [
    body('name')
        .notEmpty()
        .withMessage('Name is required'),
    body('email')
        .isEmail()
        .withMessage('Valid email is required'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];

// 🔐 User Login Validation
const validateLogin = [
    body('email')
        .isEmail()
        .withMessage('Valid email is required'),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
];

// 🎯 Goal Create/Update Validation
const validateGoal = [
    body('title')
        .notEmpty()
        .withMessage('Goal title is required'),
    body('description')
        .optional()
        .isString()
        .withMessage('Description must be a string'),
    body('status')
        .optional()
        .isIn(['pending', 'in-progress', 'completed'])
        .withMessage('Status must be one of: pending, in-progress, completed'),
    body('deadline')
        .optional()
        .isISO8601()
        .withMessage('Deadline must be a valid ISO date'),
];

module.exports = {
    validateRegister,
    validateLogin,
    validateGoal,
};
