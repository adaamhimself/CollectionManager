// This contoller holds the logic that works on developer requests

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const Collection = require('../models/collectionModel');
const Listing = require('../models/listingModel');
const Item = require('../models/itemTemplate');
const Storage = require('../models/storageModel');
const Article = require('../models/articleModel');


module.exports.removeUser = async function(targetEmail, requesterId) {
    // verify permissions
    let requester = await User.findOne({_id: requesterId});
    if (requester.role === "administrator" || requester.role === "developer") {
        // delete chosen account
        if (targetEmail) {
            try {
                let found = await User.findOne({email: targetEmail});
                // prevent deletion of administrator and developer accounts
                if (found.role === "administrator" || found.role === "developer") {
                    return {code: 400, message: `Insufficient privileges to delete this account`};
                } else {
                    if (found) {
                        try {
                            await User.deleteOne({email: targetEmail});
                            return {code: 201, message: `User: ${targetEmail} has been deleted`};
                        } catch(error) {
                            return {code: 400, message: `Error deleting account: ${error}`};
                        }
                    } else {
                        return {code: 404, message: `User: ${targetEmail} not found`};
                    }
                }
            } catch(error) {
                return {code: 400, message: `Database error: ${error.code}`};
            }
        } else if (Object.keys(data).length === 0) {
            return {code: 400, message: "Request body is empty"};
        } else if (Object.keys(targetEmail).length === 0) {
            return {code: 400, message: "Request must contain an email"};
        } else {
            return {code: 400, message: "Error removing user"};
        }
    } else {
        return { code: 400, message: "You do not have authorization to delete an account"};
    }
}

module.exports.getListOfUSers = async function(requesterId) {
    // verify permissions
    let requester = await User.findOne({_id: requesterId});
    if (requester.role === "administrator" || requester.role === "developer") {
        let userList = await User.find({}, {_id: 1, username:1, email:1, role:1});
        var finalList = [];
        // extract the id from the objectId object and create a new array
        userList.forEach(function(item) {
            let id = item._id.valueOf();
            let username = item.username;
            let email = item.email;
            let role = item.role;
            finalList.push({username, id, email, role})
        });
        // return the refined array
        return {code: 200, message: finalList};
    } else {
        return {code: 400, message: `Not authorized for this function`};
    }
}

module.exports.documentStats = async function() {
    try {
        let response = {};

        let numUsers = await User.countDocuments();
        let numCollections = await Collection.countDocuments();
        let numItems = await Item.countDocuments();
        let numListings = await Listing.countDocuments();
        let numArticles = await Article.countDocuments();
        let numStorage = await Storage.countDocuments();
    
        response.number_of_users = numUsers;
        response.number_of_collections = numCollections;
        response.number_of_items = numItems;
        response.number_of_listings = numListings;
        response.number_of_articles = numArticles;
        response.number_of_storage = numStorage;
    
        return {code: 200, message: response};
    } catch(error) {
        return {code: 400, message: error};
    }


}
