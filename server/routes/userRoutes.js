const express = require('express');
const router = express.Router();
const passport = require('passport');
const user = require('../controllers/userController.js');

router.get('/findUser/:name', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await user.findUser(req.params.name);
    res.status(response.code).json(response.message);
});

router.get('/getuserDetails/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await user.getUserDetails(req.params.id);
    res.status(response.code).json(response.message);
});

router.get('/getMyDetails', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await user.getUserDetails(req.user._id);
    res.status(response.code).json(response.message);
});

router.put('/editUserDetails/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await user.editUserDetails(req.params.id, req.body);
    res.status(response.code).json(response.message);
});


module.exports = router;