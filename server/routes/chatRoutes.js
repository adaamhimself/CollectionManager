const express = require('express');
const router = express.Router();
const passport = require('passport');
const chat = require('../controllers/chatController');

router.get('/getMessagesWithUser/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await chat.getMessagesWithUser(req.user._id, req.params.id);
    res.status(response.code).json(response.message);
});

router.get('/getConversationList', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await chat.getConversations(req.user._id);
    res.status(response.code).json(response.message);
});

router.post('/addToConversation', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await chat.addToConversation(req.body);
    res.status(response.code).json(response.message);
});

router.delete('/deleteConversation/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await storage.deleteConversation(req.params.id);
    res.status(response.code).json(response.message);
});