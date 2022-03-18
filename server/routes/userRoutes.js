const express = require('express');
const router = express.Router();
const user = require('../controllers/userController.js');

router.get('/getuserDetails/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await user.getUserDetails(req.params.id);
    res.status(response.code).json(response.message);
});