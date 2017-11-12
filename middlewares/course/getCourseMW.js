var requireOption = require('../common').requireOption;

/**
 * Get the course for the courseid param
 *  - if there is no such course, redirect to /courses
 *  - if there is one, put it on res.tpl.course
 */
module.exports = function (objectrepository) {

    var courseModel = requireOption(objectrepository, 'courseModel');

    return function (req, res, next) {
        console.log('getCourseMW');
        return next();
    };

};