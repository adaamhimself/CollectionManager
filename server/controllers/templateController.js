// Mongoose
const mongoose = require('mongoose');

// Controllers
const article = require('../models/articleModel');
const book = require('../models/bookTemplateModel');
const comic = require('../models/comicBookTemplateModel');
const doll = require('../models/dollTemplateModel');
const movie = require('../models/movieTemplateModel');
const record = require('../models/recordTemplateModel');
const stamp = require('../models/stampsTemplateModel');
const card = require('../models/tradingCardTemplateModel');
const watch = require('../models/watchTemplateModel');
const item = require('../models/itemTemplate');
const articleModel = require('../models/articleModel');

// Methods
module.exports.addTemplateToItem = async function(item_id, template_request) {
    let template_type = template_request.template_type;
    let template_details = template_request.template_values;
    try {
        let template = mongoose.model(template_type);
        let newTemplate = new template(template_details)
        let result = await newTemplate.save();
        await item.findOneAndUpdate(item_id, 
            {
                $set:
                    { 
                        template_object_id: result._id, template_name: template_type
                    }
            }
        );
        return {code: 201, message: `Template type ${template_type} added to ${item_id}`};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.getTemplateDetails = async function(template_id, template_type) {
    try {
        let template = mongoose.model(template_type);
        let result = await template.findById({_id: template_id});
        return {code: 200, message: result};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.editTemplateValues = async function(template_id, template_type, editRequest) {
    try {
        let template = mongoose.model(template_type);
        let result = await template.findByIdAndUpdate(template_id, editRequest);
        return {code: 200, message: `Template ${template_id} updated`};
    } catch(error) {
        return {code: 400, message: error};
    }
}
