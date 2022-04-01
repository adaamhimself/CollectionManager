const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const bookSchema = new Schema({
    "author": String,
    "date_published": String,
    "publisher": String,
    "format": String,
    "edition": String,
    "language": String,
    "pages": String
});

module.exports = Mongoose.model('book', bookSchema);