const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const storageSchema = ({
    "storage_name": String,
    "storage_code": String,
    "storage_type": String,
    "storage_location": String,
    "stored_items_reference_ids": [String]
});

module.exports = Mongoose.model('storage', storageSchema);