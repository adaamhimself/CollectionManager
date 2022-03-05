const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const postingSchema = new Schema({
    "item_id": String,
    "listing_price": String,
    "listing_date": {
        type: Date,
        default: Date.now()
    },
    "listing_note": String,
    "promoted": Boolean
});