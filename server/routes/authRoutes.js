const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

// Register a new user
router.post('/registerUser', (req, res) => {
    auth.register(req.body, res);
});

// Login and provide token
router.post('/login', (req, res) => {
    auth.login(req.body, res);
});

module.exports = router;