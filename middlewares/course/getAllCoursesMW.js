var requireOption = require('../common').requireOption;

/**
 * Get all the courses
 *  put it on res.tpl
 */
module.exports = function (objectrepository) {

    var courseModel = requireOption(objectrepository, 'courseModel');

    return function (req, res, next) {
        if (res.tpl.logToConsole) console.log('getAllCoursesMW');

        courseModel.find({
            _user: req.session.userid
        }, function (err, results) {
            if (err) {
                return next(new Error('Error getting courses'));
            }

            res.tpl.courses = results;
            return next();
        });
    };
};