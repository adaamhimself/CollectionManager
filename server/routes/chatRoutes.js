const express = require('express');
const router = express.Router();
const passport = require('passport');
const chat = require('../controllers/chatController');

router.get('/getMessagesWithUser/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await chat.getMessagesWithUser(req.params.id);
    res.status(response.code).json(response.message);
});

router.get('/getConversationList', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await chat.getConversations(req.user._id);
    res.status(response.code).json(response.message);
});

router.post('/addToConversation/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await chat.addToCoversation(req.user._id, req.params.id, req.body);
    res.status(response.code).json(response.message);
});

router.post('/createConversation/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await chat.createConversation(req.user._id, req.params.id);
    res.status(response.code).json(response.message);
});

router.delete('/deleteConversation/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await chat.deleteConversation(req.params.id);
    res.status(response.code).json(response.message);
});

router.delete('/clearConversation/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await chat.clearConversation(req.params.id);
    res.status(response.code).json(response.message);
});

module.exports = router;