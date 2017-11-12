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
            (typeof req.body.website === 'undefined')) {
            return next();
        }

        var course = undefined;

        if (typeof res.tpl.course !== 'undefined') {
            course = res.tpl.course;
        } else {
            course = new courseModel();
        }

        course.name = req.body.name;
        course.website = req.body.website;

        console.log("\tNév:" + req.body.name); //DEBUG
        console.log("\tWeb:" +req.body.website); //DEBUG

        course.save(function (err, result) {
            if (err) {
                return next(err);
            }

            //return res.redirect('/courses/' + result.id);
            return next();
        });
    };

};