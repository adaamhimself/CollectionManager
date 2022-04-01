const express = require('express');
const router = express.Router();
const passport = require('passport');
const item = require('../controllers/itemController');

router.get('/getItemById/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await item.getItemById(req.user._id, req.params.id);
    res.status(response.code).json(response.message);
});

router.get('/getItemsByCollectionId/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await item.getItemsByCollectionId(req.user._id, req.params.id);
    res.status(response.code).json(response.message);
});

router.post('/addItem', passport.authenticate('jwt', {session: false}), async(req, res) => {
    console.log(req.body);
    let response = await item.addItem(req.user._id, req.body);
    res.status(response.code).json(response.message);
});

router.put('/editItem/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await item.editItem(req.user._id, req.body, req.params.id);
    res.status(response.code).json(response.message);
});

router.delete('/removeItem/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await item.removeItem(req.user._id, req.params.id);
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

router.post('/addCustomField/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await item.addCustomField(req.params.id, req.body);
    res.status(response.code).json(response.message);
});

router.get('/getCustomFields/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await item.getCustomFields(req.params.id);
    res.status(response.code).json(response.message);
});

router.put('/modifyCustomFieldValue', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await item.modifyCustomFieldValue(req.body);
    res.status(response.code).json(response.message);
});

router.delete('/removeCustomField/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await item.removecustomField(req.params.id);
    res.status(response.code).json(response.message);
});

module.exports = router;