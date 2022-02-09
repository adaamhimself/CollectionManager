// This contoller holds the logic that works on item creation/modification/deletion requests

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/userModel');
const Collection = require('../models/collectionModel');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const { collection } = require('../models/userModel');
const fs = require("fs");

module.exports.getItemById = async function() {

}

module.exports.getItemsByCollectionId = async function() {

}

module.exports.createItem = async function() {

}

module.exports.editItem = async function() {

}

module.exports.removeItem = async function() {

}

module.exports.addImageToItem = async function() {

}

module.exports.deleteImageFromItem = async function() {

}