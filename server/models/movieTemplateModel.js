const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const movieSchema = new Schema({
    "template_object_id" : String,
    "actors" : [String],
    "format" : String,
    "year_released" : String,
    "genre" : String,
    "publisher" : String,
    "run_time" : String    
});

module.exports = Mongoose.model('movie', movieSchema);