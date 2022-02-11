module.exports.validateRequestBody = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({message: `Request body is empty`});
    } else {
        next();
    }
};