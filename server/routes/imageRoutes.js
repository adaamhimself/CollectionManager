const express = require('express');
const router = express.Router();
const passport = require('passport');
const image = require('../controllers/imageController');

// Multer
const path = require("path");
const fs = require("fs");
const multer = require('multer');
const storage = multer.diskStorage({
    destination: "./public/photos",
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
const upload = multer({ storage: storage });

router.post('/addImageToItem/:id', passport.authenticate('jwt', {session: false}), upload.single("image"), async(req, res) => {
    let response = await image.addImageToItem(req.params.id, req.file, req.user._id);
    res.status(response.code).json(response.message);
});

router.delete('/deleteImageFromItem', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await image.deleteImageFromItem(req.user._id, req.body.filename);
    res.status(response.code).json(response.message);
});

router.get('/getItemImages/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await image.getItemImages(req.params.id);
    res.status(response.code).json(response.message);
});

module.exports = router;