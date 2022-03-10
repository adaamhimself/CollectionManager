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
        
        // iterate through results array
        for (i=0; i < result.length; i++) {
            let conversation = {};
            conversation._id = result[i]._id;
            conversations.push(conversation);
            if (result[0].participants[0] === user_id) {
                let username = await User.findById(result[i].participants[1].trim());
                conversation.username = username.username;
                conversation.other_participant_id = username._id.toString();
            } else if (result[0].participants[1] === user_id) {
                let username = await User.findById(result[i].participants[0].trim());
                conversation.username = username.username;
                conversation.other_participant_id = username._id.toString();
            }
        }
        
        // let conversation = {};
        // ocnversation._id = result._id;
        // if (result.participants[0] === user_id) {
        //     username = await User.findById(result.participants[1].trim());
        //     conversation.username = username.username;
        //     conversation.other_participant_id = username._id.toString();
        //     console.log(username);
        // } else if (result.participants[1] === user_id) {
        //     username = await User.findById(result.participants[0].trim());
        //     conversation.username = username.username;
        //     conversation.other_participant_id = username._id.toString();
        //     console.log(conversation.username);
        // }
        return {code: 200, message: conversations};
    } catch(error) {
        console.log(error);
        return {code: 400, message: error};
    }
}


module.exports.addToCoversation = async function(user_id, other_user_id, newMessage) {
    try {
        let found = await Chat.find({participants: {$all: [user_id, other_user_id]}});
        if (Object.keys(found).length != 0) {
            let message = {
                author: user_id,
                body: newMessage.body
            }
            let result = await Chat.updateOne({participants: {$all: [user_id, other_user_id]}}, {$push: {messages: message}});
            return {code: 201, message: "Message added"};
        } else {
            let newConversation = new Chat();
            newConversation.participants = [user_id, other_user_id];
            let message = {
                author: user_id,
                body: newMessage.body
            }
            newConversation.messages.push(message)
            await newConversation.save();
            return {code: 201, message: "Conversation created and message added"};
        }
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
