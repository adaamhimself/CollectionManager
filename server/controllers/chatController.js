const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const express = require('express');
const app = express();

const Chat = require('../models/chatModel');
const User = require('../models/userModel');

module.exports.getMessagesWithUser = async function(user_id) {
    // returns all the messages between the requestor and the other user
    try {
        user_id = user_id.trim();
        let result = await Chat.find({participants: user_id});
        
        return {code: 200, message: result};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.getConversations = async function(user_id) {
    // returns a list of conversation ids and the name of the other participant
    try {
        let result = await Chat.find({participants: user_id});
        let conversation = [];
        let other_user_id;

        for (i = 0; i < result.length; i++) {
            if (result[i].participants[0] === user_id) {
                username = await User.findById(result[i].participants[1]);
                username = username.username;
            } 
            else if (result[i].participants[1] === user_id) {
                username = await User.findById(result[i].participants[0]);
                username = username.username;
            }
            conversation.push({username: username, messages: result[i].messages});
        }
        return {code: 200, message: conversation};
    } catch(error) {
        return {code: 400, message: error};
    }
}


module.exports.addToCoversation = async function(user_id, other_user_id, newMessage) {
    try {
        let found = await Chat.find({participants: user_id, participants: other_user_id});
        if (Object.keys(found).length != 0) {
            let message = {
                author: user_id,
                body: newMessage.body
            }
            let result = await Chat.updateOne({participants: user_id, participants: other_user_id}, {$push: {messages: message}});
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
