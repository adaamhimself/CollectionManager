const express = require('express');
const router = express.Router();
const passport = require('passport');
const dev = require('../controllers/devController');
const validate = require('../validateRequest');

router.post('/removeUser', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await dev.removeUser(req.body.email, req.user._id);
    res.status(response.code).json(response.message);
});

router.get('/getListOfUsers', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await dev.getListOfUSers(req.user._id);
    res.status(response.code).json(response.message);
});

router.get('/checkRole', passport.authenticate('jwt', {session: false}), async(req, res) => {
    res.status(200).json(req.user.role);
});

router.get('/documentStats', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await dev.documentStats();
    res.status(response.code).json(response.message); 
});

module.exports = router;