var requireOption = require('../common').requireOption;

/**
 * Save the course for the courseid param
 *  - if there is no such course, create it
 *  - if there is one, save it
 */
module.exports = function (objectrepository) {

    var courseModel = requireOption(objectrepository, 'courseModel');

    return function (req, res, next) {
        console.log('saveCourseMW');
        return next();
    };

};