const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Listing = require('../models/listingTemplateModel');

module.exports.getListing = async function(id) {
    try {
        id = id.trim();
        let result = await Listing.findById({_id: id});
        return {code: 200, message: result};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.getListingsByCategoryId = async function(category) {
    try {
        let result = await Listing.find({listing_category: category})
        return {code: 200, message: result};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.createListing = async function(user_id, listing) {
    try {
        let newListing = new Listing(listing);
        newListing.listing_user_id = user_id;
        let result = await newListing.save();
        return {code: 201, message: "Listing created"};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.modifyListing = async function(changes) {
    try {

    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.deleteListing = async function(id) {
    try {

    } catch(error) {
        return {code: 400, message: error};
    }  
}