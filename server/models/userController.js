const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports.getUserDetails = async function(id) {
    try {
        let result = await User.find({_id: id});
        return {code: 200, message: result};
    } catch(error) {
        return {code: 400, message: error};
    }
}