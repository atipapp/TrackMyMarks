//var requireOption = require('../common').requireOption;

/**
 * Delete the course for the courseid param
 *  - if there is no such course, redirect to /courses
 *  - if there is one, delete it
 */
module.exports = function (objectrepository) {

    //var targyModel = requireOption(objectrepository, 'taskModel');

    return function (req, res, next) {
        return next();
    };

};