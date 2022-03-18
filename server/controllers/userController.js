const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports.getUserDetails = async function(id) {
    try {
        let result = await User.findOne({_id: id});
        return {code: 200, message: result};
    } catch(error) {
        return {code: 400, message: error};
    }
}

module.exports.editUserDetails = async function(id, update) {
    try {
        let result = await User.findById(id);
        if (result._id.toString() === id) {
            let result2 = await User.findByIdAndUpdate(id, update);
            return {code: 200, message: `User: ${id} has been updated`}
        } else {
            return {code: 400, message: "You are not authorized to update this user"};
        }
    } catch(error) {
        return {code: 400, message: error};
    }
}