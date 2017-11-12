var requireOption = require('../common').requireOption;

/**
 * Get all the courses
 *  put it on res.tpl
 */
module.exports = function (objectrepository) {

    var courseModel = requireOption(objectrepository, 'courseModel');

    return function (req, res, next) {
        console.log('getAllCoursesMW');
        return next();
    };

};