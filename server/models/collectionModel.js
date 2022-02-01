const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const collectionSchema = new Schema({
    "collection_name": String,
    "collection_description": String,
    "collection_user_id": String,
    "collection_image": {
        "collection_image_path": String,
        "collection_image_text": String,
        "collection_image_alt_text": String
    },
    "items": [{
        "item_title": String,
        "item_description": String,
        "template_object_id": String,
        "template_name": String,
        "condition": String,
        "condition_note": String,
        "storage_object_id": String,
        "storage_note": String,
        "reference_number": String,
        "date_created": String,
        "date_last_updated": String,
        "custom_fields": [{
            "key": Number,
            "value": String
        }],
        "item_images": [{
            "item_image_path": String,
            "item_image_text": String,
            "item_image_alt_text": String
        }],
        "conversations": [{
            "participant_id": [String],
            "messages": [{
                "message_time": String,
                "message_content": String
            }]
        }]
    }]
});

module.exports = Mongoose.model('collection', collectionSchema);
