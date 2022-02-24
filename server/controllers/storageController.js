// This contoller holds the logic that works on storage location requests

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const Storage = require('../models/storageModel');
const Item = require('../models/itemTemplate');

module.exports.getItemsInStorageByCode = async function(storageId) {
    // Find all items where storage_object_id matches storageId
    try {
        let result = Item.find({"storage_object_id": storageId});
        return {code: 200, message: result};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.getStorageDetails = async function(storageId) {
    // Return the details of a storage location by Id
    try {
        let result = await Storage.findById(storageId);
        return {code: 200, message: result};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.getStorageByUserId = async function(userId) {
    // Return all storage associated with a userId
    try {
        let result = await Storage.find({"storage_owner_id": userId});
        return {code: 200, message: result};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.createStorage = async function(data) {
    try {
        let newStorage = new Storage(data);
        await newStorage.save();
        return {code: 201, message: `Storage location created`};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.editStorageDetails = async function(editRequest) {
    try {
        await Storage.findByIdAndUpdate(editRequest._id, editRequest);
        return {code: 200, message: `Storage ${editRequest._id} updated`};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.addItemToStorage = async function(storageId, itemId) {
    // Add the item to storage location by updating it's storage_object_id field to associate with new storage location
    try {
        await Item.findByIdAndUpdate(storageId, 
            {
                "storage_object_id": itemId
            }
        );
        return {code: 200, message: `Storage location for item ${itemId} updated`};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.removeItemFromStorage = async function(itemId) {
    // Remove the association between an item and a storage location
    try {
        await Item.findByIdAndUpdate(itemId, 
            {
                $set:
                {
                    "storage_object_id": ""
                }
            }
        );
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.transferItemToADifferentStorage = async function(newStorageId, itemId) {
    try {
        await Item.findByIdAndUpdate(itemId, 
            {
                $set:
                {
                    "storage_object_id": newStorageId
                }
            }
        );
    } catch(error) {
        return {code:400, message: error};
    }
}

module.exports.removeStorageLocation = async function(storageId) {
    // Delete the storage document and remove the association from all items
    try {
        await Storage.findByIdAndDelete(storageId);
        try {
            Item.updateMany({"storage_object_id": storageId}, 
            {
                $set:
                {
                    "storage_object_id": ""
                }
            }
        );
        } catch(error) {
            return {code:400, message: error};
        }
    } catch(error) {
        return {code: 400, message: error};
    }
}