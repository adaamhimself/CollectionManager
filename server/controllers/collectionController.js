// This contoller holds the logic that works on collection creation/modification/deletion requests

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/userModel');
const Collection = require('../models/collectionModel');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');


module.exports.getCollectionById = async function(collection_id) {
    try {
        let result = await Collection.find({_id: collectio_id});
        return {code: 200, message: result};
    } catch(error) {
        if (error.name == "CastError") return {code: 404, message: `Cannot find ${collectionId}`};
        return {code: 400, message: error};
    }
}

module.exports.getCollectionsByUserId = async function(userId) {
    let collections = [];
    try {
        collections = await Collection.find({collection_user_id: userId});
        return {code: 200, message: collections};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.createCollection = async function(requesterId, data) {
    data.collection_user_id = requesterId;
    let newCollection = new Collection(data);
    let collectionId;
    try {
        let result = await newCollection.save();
        collectionId = result._id.valueOf();
        try {
            await User.updateOne(
                { _id: requesterId },
                { $push: { collections: collectionId } }
            );
        } catch(error) {
            return {code: 400, message: error};
        }
        return {code: 201, message: `Collection ${data.collection_name} has been created`};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.editCollection = async function(userId, editRequest) {
    let keys = Object.keys(editRequest);
    let i = 0;
    let collectionId = { _id: editRequest.collection_id};
    let result = await Collection.findById(collectionId);
    if(result.collection_user_id === userId) {
        try {
            for (var j = 0 in editRequest) {
                if (i == 0) {
                    id = editRequest[j];
                }
                let field = keys[i];
                let value = editRequest[j];
                let update = { [keys[i]]: value};
                if (i > 0) {
                    await Collection.findOneAndUpdate(collectionId, update);
                }
                i++;
            }
        } catch(error) {
            return {code: 400, message: error};
        }
        return {code: 200, message: `Collection ${editRequest.collection_name} has been updated`}
    } else {
        return {code: 400, message: "Not authorized to update this collection"};
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
        return {code: 400, message: "Not authorized to remove this collection"};
    }
}