// *****************
// * Express setup *
// *****************
const express = require('express');
const router = express.Router();
const passport = require('passport');
const collection = require('../controllers/collectionController');
const validate = require('../validateRequest');

// ****************
// * Multer Setup *
// ****************
const path = require("path");
const fs = require("fs");
const multer = require('multer');
const req = require('express/lib/request');
const storage = multer.diskStorage({
    destination: "../public/photos",
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
const upload = multer({ storage: storage });

// *********************
// * Collection Routes *
// *********************

router.get('/getCollectionById/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await collection.getCollectionById(req.params.id);
    res.status(response.code).json(response.message);
});

router.get('/getCollectionsByUserId/', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await collection.getCollectionsByUserId(req.user._id);
    res.status(response.code).json(response.message);
});

router.post('/createCollection', validate.validateRequestBody, passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await collection.createCollection(req.user._id, req.body);
    res.status(response.code).json(response.message);
});

router.put('/editCollection', validate.validateRequestBody, passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await collection.editCollection(req.user._id, req.body);
    res.status(response.code).json(response.message);
});

router.delete('/removeCollection/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await collection.removeCollection(req.user._id, req.params.id);
    res.status(response.code).json(response.message);
})

router.post('/addImageToCollection', validate.validateRequestBody, upload.single("photo"), passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await collection.addImageToCollection(req.body, req.file.filename);
    res.status(response.code).json(response.message);
});

router.delete('/deleteImageFromCollection', validate.validateRequestBody, passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await collection.deleteImageFromCollection(req.user._id, req.body.collection_id);
    res.status(response.code).json(response.message);
});

module.exports = router;