const express = require('express');
const router = express.Router();
const passport = require('passport');
const storage = require('../controllers/storageController');
const validate = require('../validateRequest');

router.get('/getItemsInStorageByCode/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    let response = await storage.getItemsInStorageByCode(req.params.id);
    res.status(response.code).json(response.message);
});

router.get('/getStorageDetails/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    let response = await storage.getStorageDetails(req.params.id);
    res.status(response.code).json(response.message);
});

router.put('/editStorageDetails', passport.authenticate('jwt', {session: false}), (req, res) => {
    let response = await storage.editStorageDetails(req.body);
    res.status(response.code).json(response.message);
});

router.post('/addItemToStorage', passport.authenticate('jwt', {session: false}), (req, res) => {
    let response = await storage.addItemToStorage(req.body.storage_object_id, req.body.item_id);
    res.status(response.code).json(response.message);
});

router.delete('/removeItemFromStorage/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    let response = await storage.removeItemFromStorage(req.params.id);
    res.status(response.code).json(response.message);
});

router.put('/transferItemToADifferentStorage', passport.authenticate('jwt', {session: false}), (req, res) => {
    let response = await storage.transferItemToADifferentStorage(req.body.storage_object_id, req.body.item_id);
    res.status(response.code).json(response.message);
});

router.delete('/removeStorageLocation/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    let response = await storage.removeStorageLocation(req.params.id);
    res.status(response.code).json(response.message);
});