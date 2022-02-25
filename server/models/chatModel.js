const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const chatSchema = new Schema( {
    "conversation_host_id": String,
    "second_member_id": String,
    "messages": [
        {
            "author": String,
            "body": String,
            "timestamp": {
                default: Date.now
            }
        }
    ]
});

module.exports = Mongoose.model('chat', chatSchema);