const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const itemSchema = new Schema({
    "containing_collection_id": String,
    "item_user_id": String,
    "item_title": String,
    "item_description": String,
    "template_object_id": String,
    "template_name": String,
    "condition": String,
    "condition_note": String,
    "storage_object_id": String,
    "storage_type": String,
    "storage_location": String,
    "storage_note": String,
    "date_created": Date,
    "date_last_updated": Date,
    "custom_fields": [{
        "key": String,
        "value": String
    }],
    "item_images": [{
        "item_image_path": String,
        "item_image_text": String,
    }],
    "date_created": {
        type: Date,
        default: Date.now()
    }
});

module.exports = Mongoose.model('item', itemSchema);