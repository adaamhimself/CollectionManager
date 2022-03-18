const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Listing = require('../models/listingModel');

module.exports.getListing = async function(id) {
    try {
        id = id.trim();
        let result = await Listing.findById({_id: id});
        return {code: 200, message: result};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.myListings = async function(user_id) {
    try {
        user_id = user_id.trim();
        let result = await Listing.find({listing_user_id: user_id});
        return {code: 200, message: result};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.getTradingListingsByCategory = async function(category) {
    try {
        let result = await Listing.find({listing_category: category, listing_type: "trade"})
        return {code: 200, message: result};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.getSellingListingsByCategory = async function(category) {
    try {
        let result = await Listing.find({listing_category: category, listing_type: "selling"})
        return {code: 200, message: result};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.getWantedListingsByCategory = async function(category) {
    try {
        let result = await Listing.find({listing_category: category, listing_type: "wanted"})
        return {code: 200, message: result};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.getAllWantedListings = async function() {
    try {
        let result = await Listing.find({listing_type: "wanted"});
        return {code: 200, message: result};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.getAllTradingListings = async function() {
    try {
        let result = await Listing.find({listing_type: "trade"});
        return {code: 200, message: result};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.getAllSellingListings = async function() {
    try {
        let result = await Listing.find({listing_type: "selling"});
        return {code: 200, message: result};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.createListing = async function(user_id, listing) {
    try {
        let newListing = new Listing(listing);
        newListing.listing_user_id = user_id;
        newListing.promoted = false;
        let result = await newListing.save();
        return {code: 201, message: "Listing created"};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.modifyListing = async function(changes, listing_id) {
    try {
        await Listing.findByIdAndUpdate(listing_id, changes);
        return {code: 200, message: `Item ${listing_id} has been updated`};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.deleteListing = async function(id) {
    try {
        await Listing.findByIdAndDelete(id);
        return {code: 200, message: `Listing ${id} has been removed`};
    } catch(error) {
        return {code: 400, message: error};
    }  
}

module.exports.promoteListing = async function(id) {
    try {
        await Listing.findByIdAndUpdate(id, { promoted: true});
        return {code: 200, message: `Listing: ${id} promoted`};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.getAllPromotedListings = async function() {
    try {
        let result = await Listing.find({promoted: true});
        return {code: 200, message: result};
    } catch(error) {
        return {code: 400, message: error};
    }
}