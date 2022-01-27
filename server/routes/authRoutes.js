const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

// Register a new user
router.post('/registerUser', async (req, res) => {
    let response = await auth.register(req.body);
    res.status(response.code).json(response.message);
});

// Login and provide token
router.post('/login', async (req, res) => {
    let response = await auth.login(req.body, res);
    res.status(response.code).json(response.message);
});

module.exports = router;