// This contoller holds the logic that works on collection creation/modification/deletion requests

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/userModel');
const Collection = require('../models/collectionModel');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const { collection } = require('../models/userModel');
const fs = require("fs");


module.exports.getCollectionById = async function(collection_id) {
    try {
        let result = await Collection.find({_id: collection_id});
        return {code: 200, message: result};
    } catch(error) {
        if (error.name == "CastError") return {code: 404, message: `Cannot find ${collectionId}`};
        return {code: 400, message: error};
    }
}

module.exports.getCollectionsByUserId = async function(userId) {
    try {
        let result = await User.findById(userId);
        if (result.role === "administrator" || result.role === "developer") {
            let collections = [];
            try {
                collections = await Collection.find({collection_user_id: userId});
                return {code: 200, message: collections};
            } catch(error) {
                return {code: 400, message: error};
            }
        } else {
            return {code: 401, message: "You are not authorized to view this content"};
        }
    } catch(error) {
        return {code: 400, message: error};
    }    
}

module.exports.createCollection = async function(requesterId, data) {
    data.collection_user_id = requesterId;
    let newCollection = new Collection(data);
    newCollection.date_created = new Date();
    newCollection.date_last_updated = new Date();
    try {
        let result = await newCollection.save();
        return {code: 201, message: `Collection ${data.collection_name} has been created`};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.editCollection = async function(userId, editRequest) {
    // grab the collection's id 
    let collectionId = { _id: editRequest._id};
    editRequest.date_last_updated = new Date();
    let result = await Collection.findById(collectionId);  
    if (editRequest.collection_user_id == result.collection_user_id) {
        try {
            await Collection.findOneAndUpdate(collectionId, editRequest);
            return {code: 200, message: `Collection ${editRequest.collection_name} has been updated`}
        } catch(error) {
            return {code: 400, message: error};
        }
    } else {
        return {code: 401, message: "Not authorized to update this collection"};
    }


}

module.exports.removeCollection = async function(userId, collectionId) {
    let result = await Collection.findById(collectionId);
    if(result.collection_user_id === userId) {
        try {
            await Collection.findByIdAndDelete(collectionId);
        } catch(error) {
            return {code: 400, message: error};
        }
        return {code: 200, message: `Collection ${editRequest.collection_name} has been updated`}
    } else {
        return {code: 401, message: "Not authorized to remove this collection"};
    }
}

module.exports.addImageToCollection = async function(data, filename) {   
    var filePath = "../public/photos/" + filename;
    let collectionId = { _id: data.collection_id};
    // Delete existing photo to avoid duplicate images 
    let result = {};
    try {
        result = await Collection.findById(collectionId);
        // make sure that there is an image to delete
        if (result.collection_image.collection_image_path != "") {
            fs.unlinkSync(result.collection_image.collection_image_path);
        }
    } catch(error) {
        return {code: 400, message: error};
    }
    // update image path and alt text in database
    try {
        await Collection.updateOne(collectionId, 
            { 
                $set: {
                    'collection_image.collection_image_path': filePath,
                    'collection_image.collection_image_alt_text': filename
                }
            }
        );
        return {code: 200, message: `Image ${filename} has been uploaded`}    
    } catch(error) {
        return {code: 400, message: "Error saving image: " + error};
    }
}

module.exports.deleteImageFromCollection = async function(userId, data) {
    try {
        let result = await Collection.findById(data);
        if (result.collection_user_id === userId) {
            if (result.collection_image.collection_image_path) {
                fs.unlinkSync(result.collection_image.collection_image_path);
                let response = await Collection.update({collection_id: data}, 
                    { 
                        $set: {
                            'collection_image.collection_image_path': '',
                            'collection_image.collection_image_alt_text': ''
                        }
                    }
                );
                return {code: 200, message: `Collection ${result._id} image has been deleted`};
            } else {
                return {code: 400, message: `Collection ${result._id} does not have an image uploaded`};
            }
        } else {
            return {code: 401, message: "You are not authorized to delete this image"};
        }
    } catch(error) {
        return {code: 400, message: "Error deleting image: " + error};
    }
}