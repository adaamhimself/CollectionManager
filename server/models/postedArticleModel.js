const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const postedArticleSchema = new Schema({ 
    "article_title": String,
    "article_url": String,
    "article_summary": String,
    "article_category": String
});