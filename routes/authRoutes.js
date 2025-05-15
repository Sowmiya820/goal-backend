const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/register (Register User)
router.post('/register', authController.registerUser);

// POST /api/auth/login (Login User)
router.post('/login', authController.loginUser);

module.exports = router;
