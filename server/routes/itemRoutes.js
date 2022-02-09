const express = require('express');
const router = express.Router();
const passport = require('passport');
const item = require('../controllers/itemController');

router.get('/getItemById', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await item.getItemById(req.user._id, req.params.id);
    res.status(response.code).json(response.message);
});

router.get('/getAllItemsByCollectionId', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await item.getItemsByCollectionId(req.user._id, req.params.id);
    res.status(response.code).json(response.message);
});

router.post('/addItem', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await item.addItem(req.user._id, req.body);
    res.status(response.code).json(response.message);
});

router.put('/editItem', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await item.getItemById(req.user._id, req.body);
    res.status(response.code).json(response.message);
});

router.delete('/removeItem', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await item.removeItem(req.user._id, req.body);
    res.status(response.code).json(response.message);
});

router.post('/addImageToItem', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await item.addImageToItem(req.user._id, req.body);
    res.status(response.code).json(response.message);
});

router.delete('/deleteImageFromItem', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await item.deleteImageFromItem(req.user._id, req.body);
    res.status(response.code).json(response.message);
});

module.exports = router;