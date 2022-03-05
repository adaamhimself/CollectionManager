const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const chatSchema = new Schema( {
    "participants": [String],
    "messages": [
        {
            "author": String,
            "body": String,
            "timestamp": {
                type: Date,
                default: Date.now()
            }
        }
    ]
});

module.exports = Mongoose.model('chat', chatSchema);