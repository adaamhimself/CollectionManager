const express = require('express');
const router = express.Router();
const passport = require('passport');
const template = require('../controllers/templateController');

router.get('/getTemplateByItemId/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await template.getTemplateByItemId(req.params.id);
    res.status(response.code).json(response.message);
});

router.post('/addTemplateToItem/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await template.addTemplateToItem(req.params.id, req.body);
    res.status(response.code).json(response.message);
});

router.put('/editTemplateValues/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    let response = await template.editTemplateValues(req.params.id, req.body.template_type, req.body.template_edit);
    res.status(response.code).json(response.message);
});

module.exports = router;