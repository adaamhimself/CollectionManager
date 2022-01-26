const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const stampSchema = new Schema({
    "template_object_id" : String,
    "size" : String,
    "country_of_origin" : String,
    "face_value" : String    
});

module.exports = Mongoose.model('stamp', stampSchema);