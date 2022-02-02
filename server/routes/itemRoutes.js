const express = require('express');
const router = express.Router();
const passport = require('passport');
const collection = require('../controllers/collectionController');

router.get('/getItemById', passport.authenticate('jwt', {session: false}), async(req, res) => {

});

router.get('/getAllItemsByCollectionId', passport.authenticate('jwt', {session: false}), async(req, res) => [

]);

router.post('/createItem', passport.authenticate('jwt', {session: false}), async(req, res) => {

});

router.post('/editItem', passport.authenticate('jwt', {session: false}), async(req, res) => {

});

module.exports = router;