const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const tradingCardSchema = new Schema({
    "template_object_id" : String,
    "sport" : String,
    "team" : String,
    "year" : String,
    "league" : String,
    "manufacturer" : String    
});

module.exports = Mongoose.model('tradingCard', tradingCardSchema);