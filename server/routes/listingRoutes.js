const express = require('express');
const router = express.Router();
const passport = require('passport');
const listing = require('../controllers/listingController');

router.get('./getListing/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await listing.getListing(req.params.id);
    res.status(response.code).json(response.message);
});

router.post('/createListing', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await listing.createListing(req.user._id, req.body);
    res.status(response.code).json(response.message);
});

router.put('/modifyListing', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await listing.modifyListing(req.body);
    res.status(response.code).json(response.message);
});

router.delete('/deleteListing/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await listing.deleteListing(req.params.id);
    res.status(response.code).json(response.message);
});

module.exports = router;