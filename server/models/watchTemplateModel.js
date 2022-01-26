const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const watchSchema = new Schema({
    "template_object_id" : String,
    "brand" : String,
    "model" : String,
    "year" : String,
    "type" : String,
    "watch_movement" : String
});

module.exports = Mongoose.model('watch', watchSchema);