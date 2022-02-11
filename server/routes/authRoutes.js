const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const validate = require('../validateRequest');

// Register a new user
router.post('/registerUser', validate.validateRequestBody, async (req, res) => {
    let response = await auth.register(req.body);
    res.status(response.code).json(response.message);
});

// Login and provide token
router.post('/login', validate.validateRequestBody, async (req, res) => {
    let response = await auth.login(req.body, res);
    res.status(response.code).json(response.message);
});

module.exports = router;