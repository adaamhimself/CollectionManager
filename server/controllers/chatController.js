const Chat = require('../models/chatModel');
const User = require('../models/userModel');

module.exports.getMessagesWithUser = async function(user_id) {
    // returns all the messages between the requestor and the other user
    try {
        user_id = user_id.trim();
        let result = await Chat.find({participants: user_id}, {messages: 1, _id:0});
        return {code: 200, message: result[0]};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.getConversations = async function(user_id) {
    // returns a list of conversation ids and the name of the other participant
    try {
        let result = await Chat.find({participants: user_id});
        let conversations = [];
        // iterate through results array, pull out the username and id of the other participant and add it to the conversations array
        for (i=0; i < result.length; i++) {
            let conversation = {};
            conversation._id = result[i]._id;
            conversations.push(conversation);
            if (result[0].participants[0] === user_id) {
                let username = await User.findOne({ _id: result[i].participants[1].trim()});
                conversation.username = username.username;
                conversation.other_participant_id = username._id.toString();
            } else if (result[0].participants[1] === user_id) {
                let username = await User.findById(result[i].participants[0].trim());
                conversation.username = username.username;
                conversation.other_participant_id = username._id.toString();
            }
        }
        return {code: 200, message: conversations};
    } catch(error) {
        console.log(error);
        return {code: 400, message: error};
    }
}


module.exports.addToCoversation = async function(user_id, conversation_id, newMessage) {
    try {        
        let message = {
            author: user_id,
            body: newMessage.body
        }
        await Chat.updateOne({_id: conversation_id}, {$push: {messages: message}});
        return {code: 201, message: "Message added"};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.createConversation = async function(user_id, other_user_id) {
    try {
        // Ensure that both users are valid
        let response = await User.find({
            $or: 
            [
                {
                    _id: user_id,
                },
                {
                    _id: other_user_id
                }
            ]
        });
        if (response.length < 2) { return {code: 400, message: "Bad request. User(s) does not exist."}};
        // Ensure that conversation doesn't already exist
        let result = await Chat.find({
            $and: 
            [
                {
                    participants: user_id,
                },
                {
                    participants: other_user_id
                }
            ]
        });
        if (result.length > 0) { 
            return {code: 400, message: "Conversation already exists"}
        }
        let newConversation = new Chat();
        newConversation.participants = [user_id, other_user_id];
        await newConversation.save();
        return {code: 201, message: "Conversation created"};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.deleteConversation = async function(conversation_id) {
    // deletes the requested conversation by id
    try {
        await Chat.deleteOne({_id: conversation_id});
        return {code: 200, message: `Conversation ${conversation_id} deleted`};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.clearConversation = async function(conversation_id) {
    try {
        await Chat.findByIdAndUpdate(conversation_id,
            {
                $unset: 
                {
                    messages: ""
                }
            }
        ); 
        return {code: 200, message: `Conversation ${conversation_id} cleared`};
    } catch(error) {
        return {code: 400, message: error};
    }
}
