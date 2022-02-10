const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const collectionSchema = new Schema({
    "collection_name": String,
    "collection_description": String,
    "collection_user_id": String,
    "date_created": Date,
    "date_last_updated": Date,
    "collection_image": {
        "collection_image_path": String,
        "collection_image_alt_text": String
    },
    "conversations": [{
        "participant_id": [String],
        "messages": [{
            "message_time": String,
            "message_content": String
        }]
    }]
});

module.exports = Mongoose.model('collection', collectionSchema);
