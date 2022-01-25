const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

// Register a new user
router.post('/registerUser', (req, res) => {
    auth.register(req.body)
    .then((status) => { 
        res.status(201).json({ message: status}); 
    })
    .catch((err) => { 
        res.status(400).json({ message: err });
    })
});

// Login and provide token
router.post('/login', (req, res) => {
    auth.login(req.body)
    .then((token) => {
        res.status(201).json({token: token});
    })
    .catch((err) => {
        res.status(400).json({ message: err});
    });
});

module.exports = router;