var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Course = db.model('Course', {
    name: {
        type: String,
        required: true
    },
    lecturer: String,
    website: String
    //TODO: melyik Studenthez tartozik
});

module.exports = Course;