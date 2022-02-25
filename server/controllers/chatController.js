const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/userModel');
const Collection = require('../models/collectionModel');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

module.exports.getMessagesWithUser = async function(user_id, other_user_id) {
    // returns all the messages between the requestor and the other user
    
}

module.exports.getConversations = async function(user_id) {
    // returns a list of conversation ids and the name of the other participant

}

module.exports.addToConversation = async function(message) {
    // adds a message to the conversation between two users

}

module.exports.deleteConversation = async function(conversation_id) {
    // deletes the requested conversation by id

}