const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Item = require('../models/itemTemplate');

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

module.exports.addImageToItem = async function(id, fileDetails, user) {
    try {
        let imageObj = {};
        imageObj.item_image_path = "./public/photos/" + fileDetails.filename;
        imageObj.item_image_text = user + "." + fileDetails.filename;
        let result = await Item.findByIdAndUpdate(id, 
        {
            $push: 
            {
                item_images: imageObj
            }
        });
        return {code: 200, message: `Image: added`};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.deleteImageFromItem = async function(user, file) {
    try {
        let filename = user + "." + file;
        let result = await Item.findOneAndUpdate(
            {
                item_images:
                {
                    $elemMatch:
                    {
                        item_image_text: filename
                    }
                }
            },
            {
                $pull:
                {
                    item_images: { item_image_text: filename }
                }
            } 
        );
        return {code: 200, message: `Image: ${file} has been deleted`}
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.getItemImages = async function(id) {
    try {
        let result = await Item.findById(id);
        let img_array = [];
        for (i = 0; i < result.item_images.length; i++) {
            img_array.push(result.item_images[i]);
        };
        return {code: 200, message: img_array};
    } catch(error) {
        return {code: 400, message: error};
    }
}