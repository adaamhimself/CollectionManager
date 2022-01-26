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
            userName: jwt_payload.email, 
            role: jwt_payload.role }); 
    } else {
        next(null, false);
    }
});
app.use(passport.initialize());
passport.use(strategy);

module.exports.register = async function(data, res) {
    if (data.password && data.username && data.email) {
        data.password = await bcrypt.hash(data.password, 10);
        const newUser = new User(data);
        try {
            await newUser.save(); 
        } catch(err) {
            res.status(400).json(err);
        }
        res.status(201).json({"message": `User ${data.username} has been created`});
    } else {
        if (Object.keys(data).length === 0) {
            res.status(400).json("Request body is empty");
        } else {
            res.status(400).json({"Error": `Cannot create user ${data.username}. Registration requests must include username, password, and email.`});
        }
    }
}

module.exports.login = async function(data, res) {
    var found = await User.findOne({username : data.username});
    if (await bcrypt.compare(data.password, found.password)) {
        var payload = {
            _id: found._id,
            username: found.username
        }
        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.status(201).json({token: token});
    } else {
        res.status(400).json({"Error": `Login for ${data.username} unsuccessful`});
    }
}