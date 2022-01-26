const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const bookSchema = new Schema({
    "template_object_id": String,
    "author": String,
    "date_published": String,
    "publisher": String,
    "format": String,
    "edition": String,
    "language": String,
    "pages": String
});

module.exports = Mongoose.model('book', bookSchema);