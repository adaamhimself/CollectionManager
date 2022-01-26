const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const dollSchema = new Schema({
    "template_object_id" : String,
    "doll_name" : String,
    "manufacturer" : String,
    "doll_type" : String,
    "body_type" : String,
    "series" : String,
    "packaging" : String,
    "hair_colour" : String,
    "hair_style" : String,
    "clothing" : String
});

module.exports = Mongoose.model('doll', dollSchema);