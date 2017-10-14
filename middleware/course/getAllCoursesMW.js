//var requireOption = require('../common').requireOption;

/**
 * Get all the courses
 *  put it on res.tpl
 */
module.exports = function (objectrepository) {

    //var targyModel = requireOption(objectrepository, 'taskModel');

    return function (req, res, next) {
        console.log('getAllCoursesMW');
        return next();
    };

};