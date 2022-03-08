const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const articleSchema = new Schema({ 
    "article_title": String,
    "article_url": String,
    "article_summary": String,
    "article_category": String,
    "article_posted_date": {
        type: Date,
        default: Date.now()
    }
});

module.exports = Mongoose.model('article', articleSchema);