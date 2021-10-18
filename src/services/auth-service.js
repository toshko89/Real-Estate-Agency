const User = require('../models/User.js');


exports.addUser = (name,username,password) => User.create({name,username,password});