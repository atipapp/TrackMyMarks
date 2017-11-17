var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Course = db.model('Course', {
    name: {
        type: String,
        required: true
    },
    lecturer: String,
    website: String,
    _user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = Course;