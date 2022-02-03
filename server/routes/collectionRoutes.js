const express = require('express');
const router = express.Router();
const passport = require('passport');
const collection = require('../controllers/collectionController');

router.get('/getCollectionById', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await collection.getCollectionById(req.body.collection_id);
    res.status(response.code).json(response.message);
});

router.get('/getCollectionsByUserId', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await collection.getCollectionsByUserId(req.user._id);
    res.status(response.code).json(response.message);
});

router.post('/createCollection', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await collection.createCollection(req.user._id, req.body);
    res.status(response.code).json(response.message);
});

router.put('/editCollection', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await collection.editCollection(req.user._id, req.body);
    res.status(response.code).json(response.message);
});

router.delete('/removeCollection', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await collection.removeCollection(req.user._id, req.body);
    res.status(response.code).json(response.message);
})

module.exports = router;