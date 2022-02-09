// This contoller holds the logic that works on item creation/modification/deletion requests

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/userModel');
const Collection = require('../models/collectionModel');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const { collection } = require('../models/userModel');
const Item = require('../models/itemTemplate');
const fs = require("fs");

module.exports.getItemById = async function() {

}

module.exports.getItemsByCollectionId = async function() {

}

module.exports.addItem = async function(userId, item) {
    // collection id must be sent in the request body
    let collectionId = {_id: item.containing_collection_id};
    let newItem = new Item(item);
    newItem.item_user_id = userId;
    newItem.date_created = new Date();
    newItem.date_last_updated = new Date();
    try {
        let response = await newItem.save();
        let response2 = await Collection.findByIdAndUpdate(collectionId, 
            { $push: 
                {items: response._id}
            }
        );
        return {code: 201, message: `Item ${newItem.item_title} has been created`};
    } catch(error) {
        return {code: 400, message: error};
    }
    
}

module.exports.editItem = async function() {

}

module.exports.removeItem = async function() {

}

module.exports.addImageToItem = async function() {

}

module.exports.deleteImageFromItem = async function() {

}