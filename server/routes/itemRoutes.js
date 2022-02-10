// *****************
// * Express setup *
// *****************
const express = require('express');
const router = express.Router();
const passport = require('passport');
const item = require('../controllers/itemController');

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

// ***************
// * Item Routes *
// ***************

router.get('/getItemById/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await item.getItemById(req.user._id, req.params.id);
    res.status(response.code).json(response.message);
});

router.get('/getItemsByCollectionId/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await item.getItemsByCollectionId(req.user._id, req.params.id);
    res.status(response.code).json(response.message);
});

router.post('/addItem', passport.authenticate('jwt', {session: false}), async(req, res) => {
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

router.post('/addImageToItem', upload.single("photo"), passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await item.addImageToItem(req.user._id, req.body);
    res.status(response.code).json(response.message);
});

router.delete('/deleteImageFromItem', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await item.deleteImageFromItem(req.user._id, req.body);
    res.status(response.code).json(response.message);
});

module.exports = router;