const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const userSchema = new Schema({
    "username": {
        type: String,
        unique: true
    },
    "password": String,
    "email": {
        type: String,
        unique: true
    },
    "full_name": String,
    "role": {
        type: String,
        default: "user"
    },
    "collections": [String]
});


module.exports = Mongoose.model('user', userSchema);