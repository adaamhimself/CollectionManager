const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const recordSchema = new Schema({
    "template_object_id": String,
    "title": String,
    "artist": String,
    "year_release": String,
    "publisher": String,
    "record_size": String,
    "length": String,
    "album_notes": String,
    "tracks": [{
        "track_number": String,
        "track_name": String,
        "track_length": String,
        "track_notes": String
    }]
});

module.exports = Mongoose.model('record', recordSchema);