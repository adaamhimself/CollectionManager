const express = require('express');
const router = express.Router();
const passport = require('passport');
const collection = require('../controllers/collectionController');

router.get('/getCollections', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await collection.getCollections(req.user._id);
    res.status(response.code).json(response.message);
});

router.get('/getCollectionById', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await collection.getCollectionById(req.user._id, req.body.collectionId);
    res.status(response.code).json(response.message);
});

router.post('/createCollection', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await collection.createCollection(req.user._id, req.body);
    res.status(response.code).json(response.message);
});

module.exports = router;