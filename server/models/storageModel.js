const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const storageSchema = ({
    "storage_name": String,
    "storage_type": String,
    "storage_location": String,
    "storage_owner_id": String
});

module.exports = Mongoose.model('storage', storageSchema);