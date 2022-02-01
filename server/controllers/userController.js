// This controller holds the logic that works on user profile requests

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/userModel');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

