const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Article = require('../models/articleModel');

module.exports.getArticleDetails = async function(id) {
    try {
        let result = await Article.findById({_id: id});
        return {code: 200, message: result};
    } catch(error) {
        return {code: 400, message: error}
    }
}

module.exports.getListOfArticles = async function() {
    try {
        let result = await Article.find({});
        return {code: 200, message: result};
    } catch(error) {
        return {code: 400, message: error}
    }
}

module.exports.createArticle = async function(article) {
    try {
        let newArticle = new Article(article);
        let result = await newArticle.save();
        return {code: 201, message:`Article "${article.article_title}" created`};
    } catch(error) {
        return {code: 400, message: error}
    }
}

module.exports.editArticlePost = async function(id, article) {
    try {
        await Article.findByIdAndUpdate(id);
        return {code:200, message: `Article "${id}" updated`};
    } catch(error) {
        return {code: 400, message: error}
    }
}

module.exports.deleteArticlePost = async function(id) {
    try {
        await Article.findByIdAndDelete(id);
        return {code: 200, message: `Article "${id}" deleted`}
    } catch(error) {
        return {code: 400, message: error}
    }
}