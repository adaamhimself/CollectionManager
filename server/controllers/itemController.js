// This contoller holds the logic that works on item creation/modification/deletion requests

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/userModel');
const Collection = require('../models/collectionModel');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const Item = require('../models/itemTemplateModel');
const fs = require("fs");

module.exports.getItemById = async function(userId, itemId) {
    try {
        let result = await Item.findById({_id: itemId});
        return {code: 200, message: result};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.getItemsByCollectionId = async function(userId, collectionId) {
    try {
        let result = await Item.find({containing_collection_id: collectionId});
        return {code: 200, message: result};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.addItem = async function(userId, item) {
    let newItem = new Item(item);
    newItem.item_user_id = userId;
    newItem.date_created = new Date();
    newItem.date_last_updated = new Date();
    try {
        await newItem.save();
        return {code: 201, message: `Item ${newItem.item_title} has been created`};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.editItem = async function(userId, itemUpdate, itemId) {
    itemUpdate.date_last_updated = new Date();
    try {
        await Item.findByIdAndUpdate(itemId, itemUpdate);
        return {code: 200, message: `Item ${itemId} has been updated`};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.removeItem = async function(userId, itemId) {
    try {
        await Item.findByIdAndRemove(itemId);
        return {code: 200, message: `Item ${itemId} has been removed`};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.addImageToItem = async function() {

}

module.exports.deleteImageFromItem = async function() {

}

module.exports.getCustomFields = async function(userId, itemId) {
    try {
        let response = await Item.findById(itemId);
        return {code: 200, message: response.custom_fields};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.addCustomField = async function(userId, itemId, customField) {
    try {
        let result = await Item.findByIdAndUpdate(itemId, 
            {
                $push: {custom_fields: customField}
            }
        )
        return {code: 201, message: `Custom field ${customField.key} added`};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.removecustomField = async function() {

}

module.exports.addTemplate = async function() {
    
}