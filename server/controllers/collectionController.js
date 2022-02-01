// This contoller holds the logic that works on collection creation/modification/deletion requests

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/userModel');
const Collection = require('../models/collectionModel');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

module.exports.getCollections = async function(requesterId) {
    let requester = await User.findOne({_id: requesterId});
    //let templateId = req.body.templateId;
    
}

module.exports.getCollectionById = async function(requesterId, data) {

}

module.exports.createCollection = async function(requesterId, data) {
    data.collection_user_id = requesterId;
    let newCollection = new Collection(data);
    let collectionId;
    try {
        let result = await newCollection.save();
        collectionId = result._id.valueOf();
    } catch(error) {
        return {code: 400, message: error};
    }
    try {
        await User.updateOne(
            { _id: requesterId },
            { $push: { collections: collectionId } }
        );
    } catch(error) {
        return {code: 400, message: error};
    }
    return {code: 201, message: `Collection ${data.collection_name} has been created`};
}