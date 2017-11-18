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

        if ((typeof req.body.name === 'undefined') ||
            (typeof req.body.website === 'undefined') ||
            (typeof req.body.lecturer === 'undefined')) {
            return next();
        }

        var course = undefined;

        if (typeof res.tpl.course !== 'undefined') {
            course = res.tpl.course;
            console.log('\tCourse updated');
        } else {
            course = new courseModel();
            console.log('\tCourse created');
        }

        course.name = req.body.name;
        course.website = req.body.website;
        course.lecturer = req.body.lecturer;
        course._user = req.session.userid;
        course.avg = 0;

        course.save(function (err, result) {
            if (err) {
                return next(err);
            }

            //return res.redirect('/courses/' + result.id);
            return next();
        });
    };

};