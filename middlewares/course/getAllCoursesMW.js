var requireOption = require('../common').requireOption;

/**
 * Get all the courses
 *  put it on res.tpl
 */
module.exports = function (objectrepository) {

    var courseModel = requireOption(objectrepository, 'courseModel');

    return function (req, res, next) {
        console.log('getAllCoursesMW');

        courseModel.find({
            _user: req.session.userid
        }, function (err, results) {
            if (err) {
                return next(new Error('Error getting tasks'));
            }

            res.tpl.courses = results;
            console.log(results); //DEBUG
            return next();
        });
    };
};