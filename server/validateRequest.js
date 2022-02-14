const userModel = require("./models/userModel");

module.exports.validateRequestBody = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({message: `Request body is empty`});
    } else {
        next();
    }
};

module.exports.isAdmin = (req, res, next) => {
    if (req.user.role === "administrator") {
        next();
    } else {
        res.status(400).json({message: `Unauthorized`});
    }
};

module.exports.matchOwnerToDocumentId = function(userId, documentId) {

}