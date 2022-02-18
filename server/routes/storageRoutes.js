const express = require('express');
const router = express.Router();
const passport = require('passport');
const storage = require('../controllers/storageController');

router.get('/getItemsInStorageByCode', passport.authenticate('jwt', {session: false}), (req, res) => {
    let response = await storage.getItemsInStorageByCode(req.body.storage_object_id);
    res.status(response.code).json(response.message);
});

router.get('/getStorageDetails', passport.authenticate('jwt', {session: false}), (req, res) => {
    let response = await storage.getStorageDetails(req.body.storage_object_id);
    res.status(response.code).json(response.message);
});

router.post('/addItemToStorage', passport.authenticate('jwt', {session: false}), (req, res) => {
    let response = await storage.addItemToStorage(req.body.storage_object_id, req.body.item_id);
    res.status(response.code).json(response.message);
});

router.delete('/removeItemFromStorage', passport.authenticate('jwt', {session: false}), (req, res) => {
    let response = await storage.removeItemFromStorage(req.body.item_id);
    res.status(response.code).json(response.message);
});

router.put('/transferItemToADifferentStorage', passport.authenticate('jwt', {session: false}), (req, res) => {
    let response = await storage.transferItemToADifferentStorage(req.body.storage_object_id, req.body.item_id);
    res.status(response.code).json(response.message);
});

router.delete('/removeStorageLocation', passport.authenticate('jwt', {session: false}), (req, res) => {
    let response = await storage.removeStorageLocation(req.body.storage_object_id);
    res.status(response.code).json(response.message);
});