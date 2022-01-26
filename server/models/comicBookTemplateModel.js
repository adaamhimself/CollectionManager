const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const comicBookSchema = new Schema({
    "template_object_id" : String,
    "publisher" : String,
    "year" : String,
    "characters" : [String]
});

module.exports = Mongoose.model('comicBook', comicBookSchema);