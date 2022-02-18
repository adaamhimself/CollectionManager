const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/getItemsInStorageByCode', passport.authenticate('jwt', {session: false}), (req, res) => {

});

router.get('/getStorageDetails', passport.authenticate('jwt', {session: false}), (req, res) => {

});

router.post('/addItemToStorage', passport.authenticate('jwt', {session: false}), (req, res) => {

});

router.delete('/removeItemFromStorage', passport.authenticate('jwt', {session: false}), (req, res) => {

});

router.put('/transferItemToADifferentStorage', passport.authenticate('jwt', {session: false}), (req, res) => {

});

router.delete('/removeStorageLocation', passport.authenticate('jwt', {session: false}), (req, res) => {

});