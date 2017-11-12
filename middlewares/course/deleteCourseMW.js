var requireOption = require('../common').requireOption;

/**
 * Delete the course for the courseid param
 *  - if there is no such course, redirect to /courses
 *  - if there is one, delete it
 */
module.exports = function (objectrepository) {

    var courseModel = requireOption(objectrepository, 'courseModel');

    return function (req, res, next) {
        console.log('deleteCourseMW');
        console.log(res.tpl.course); //DEBUG

        if (typeof res.tpl.course === 'undefined') {
            return next();
        }

        res.tpl.course.remove(function (err) {
            if (err) {
                return next(err);
            }

            //redirect to all tasks
            res.redirect('/courses/');
        });
    };
};