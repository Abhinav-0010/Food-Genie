const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController')

// Signup route
router.post('/signup', AuthController.signup)   // authcontroller signup logic will be executed when this route is hit

module.exports = router;