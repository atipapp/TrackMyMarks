//var requireOption = require('../common').requireOption;

/**
 * Save the course for the courseid param
 *  - if there is no such course, create it
 *  - if there is one, save it
 */
module.exports = function (objectrepository) {

    //var targyModel = requireOption(objectrepository, 'taskModel');

    return function (req, res, next) {
        console.log('saveCourseMW');
        return next();
    };

};