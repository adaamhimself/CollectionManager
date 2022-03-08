const express = require('express');
const router = express.Router();
const passport = require('passport');
const Article = require('../controllers/postedArticleController');

router.get('/getArticleDetails/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await Article.getArticleDetails(req.params.id);
    res.status(response.code).json(response.message);
});

router.get('/getListOfArticles', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await Article.getListOfArticles();
    res.status(response.code).json(response.message);
});

router.post('/createArticle', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await Article.createArticle(req.body);
    res.status(response.code).json(response.message);
});

router.put('/editArticlePost/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await Article.editArticlePost(req.params.id, req.body);
    res.status(response.code).json(response.message);
});

router.delete('/deleteArticlePost/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await Article.getArticleDetails(req.params.id);
    res.status(response.code).json(response.message);
});

module.exports = router;