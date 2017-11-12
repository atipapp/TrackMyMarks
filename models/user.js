var Schema = require('mongoose').Schema;
var db = require('../config/db');

var User = db.model('User', {
    username: String,
    password: String,
    fullname: String,
    email: String

});

module.exports = User;