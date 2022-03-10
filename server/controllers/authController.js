// This contoller holds the logic that works on account authorization requests

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/userModel');
const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');

// JWT
const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
jwtOptions.secretOrKey = 'fkpm3FPpZCyG%d@@UI8IPBoxw';
var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    if (jwt_payload) {
        next(null, { _id: jwt_payload._id, 
            username: jwt_payload.username, 
            role: jwt_payload.role }); 
    } else {
        next(null, false);
    }
});
app.use(passport.initialize());
passport.use(strategy);

module.exports.register = async function(data) {
    if (data.password && data.username && data.email) {
        data.password = await bcrypt.hash(data.password, 10);
        // ensure all accounts are created in lowercase to avoid issues
        data.username = String(data.username).toLowerCase();
        const newUser = new User(data);
        newUser.date_created = new Date();
        try {
            await newUser.save(); 
        } catch(error) {
            if (error.code == 11000) {
                return {code: 400, message: "Error: duplicate user"};
            }
            else return {code: 400, message: `Database error: ${error.code}`};
        }
        return {code: 201, message: `User ${data.username} has been created`};
    } else {
        if (Object.keys(data).length === 0) {
            return {code: 400, message: "Request body is empty"};
        } else {
            return {code: 400, message: `Cannot create user ${data.username}. Registration requests must include username, password, and email`};
        }
    }
}

module.exports.login = async function(data) {
    if (data.username && data.password) {
        data.username = String(data.username).toLowerCase();
        var found = await User.findOne({username : data.username});
        if (found === null) { return {code: 400, message: "User not found"};}
        if (await bcrypt.compare(data.password, found.password)) {
            var payload = {
                _id: found._id,
                username: found.username,
                role: found.role
            }
            var token = jwt.sign(payload, jwtOptions.secretOrKey);
            return {code: 200, message: {token: token}};
        } else {
            return {code: 400, message: `Login for ${data.username} unsuccessful`}
        }
    } else {
        if (Object.keys(data).length === 0) {
            return {code: 400, message: "Request body is empty"};
        } else {
            return {code: 400, message: `Cannot login user ${data.username}. Login requests must include username and password`};
        }
    }
}