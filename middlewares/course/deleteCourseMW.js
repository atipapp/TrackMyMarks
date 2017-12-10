var requireOption = require('../common').requireOption;

/**
 * Delete the course for the courseid param
 *  - if there is no such course, redirect to /courses
 *  - if there is one, delete it
 */
module.exports = function (objectrepository) {

    var courseModel = requireOption(objectrepository, 'courseModel');
    var markModel = requireOption(objectrepository, 'markModel');

    return function (req, res, next) {

        if (typeof res.tpl.course === 'undefined') {
            return next();
        }

        res.tpl.course.remove(function (err) {
            if (err) {
                return next(err);
            }

            markModel.find({
                _course: res.tpl.course
            }).exec(function (err, results) {
                if (err) {
                    return next(err);
                }

                results.forEach(function (element) {
                    element.remove();
                });
            });

            //redirect to all tasks
            res.redirect('/courses/');
        });
    };
};