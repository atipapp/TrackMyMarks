var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Mark = db.model('Mark', {
    value: {
        type: Number,
        min: 1,
        max: 5,
        default: 5,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    details: String,
    _course:{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }
    //TODO: melyik Coursehoz tartozik
});

module.exports = Mark;