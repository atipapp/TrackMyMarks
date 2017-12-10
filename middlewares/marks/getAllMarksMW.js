var requireOption = require('../common').requireOption;

/**
 * Get all the marks to a course
 *  put it on res.tpl
 */
module.exports = function (objectrepository) {
    var markModel = requireOption(objectrepository, 'markModel');
    var courseModel = requireOption(objectrepository, 'courseModel');


    return function (req, res, next) {
        if (res.tpl.logToConsole) console.log('getAllMarksMW');

        markModel.find({
            _course: req.param('id')
        }).exec(function (err, results) {
            if (err) {
                return next(err);
            }

            res.tpl.course.avg = 0;
            results.forEach(function (element) {
                res.tpl.course.avg += element.value;
            });

            if (res.tpl.course.avg > 0 && results.length > 0){
                res.tpl.course.avg/=results.length;
            }

            res.tpl.course.avg = Math.round( res.tpl.course.avg * 100 ) / 100;

            var course = res.tpl.course;

            course.save(function (err, result) {
                if (err) {
                    return next(err);
                }

                //return res.redirect('/courses/' + result.id);
                return next();
            });

            results.sort(function (a, b) {
                return a.date - b.date;
            });

            res.tpl.coursemarks = results;
            return next();
        });
    };

};