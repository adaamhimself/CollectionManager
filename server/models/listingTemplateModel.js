const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const listingSchema = new Schema({
    "item_id": String,
    "listing_name": String,
    "listing_user_id": String,
    "listing_price": String,
    "listing_date": {
        type: Date,
        default: Date.now()
    },
    "listing_description": String,
    "listing_type": String,
    "listing_category": String,
    "listing_location": String,
    "promoted": {
        type: Boolean,
        default: false 
    }
});

module.exports = Mongoose.model('listing', listingSchema);