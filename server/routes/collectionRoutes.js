const express = require('express');
const router = express.Router();
const passport = require('passport');
const collection = require('../controllers/collectionController');

router.get('/getCollectionById/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await collection.getCollectionById(req.params.id);
    res.status(response.code).json(response.message);
});

router.get('/getMyCollections/', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await collection.getMyCollections(req.user._id);
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

router.delete('/removeCollection/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await collection.removeCollection(req.user._id, req.params.id);
    res.status(response.code).json(response.message);
})

router.post('/addImageToCollection', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await collection.addImageToCollection(req.body, req.file.filename);
    res.status(response.code).json(response.message);
});

router.delete('/deleteImageFromCollection', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await collection.deleteImageFromCollection(req.user._id, req.body.collection_id);
    res.status(response.code).json(response.message);
});

module.exports = router;