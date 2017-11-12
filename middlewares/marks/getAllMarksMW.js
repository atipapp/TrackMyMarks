var requireOption = require('../common').requireOption;

/**
 * Get all the marks to a course
 *  put it on res.tpl
 */
module.exports = function (objectrepository) {
    var markModel = requireOption(objectrepository, 'markModel');
    return function (req, res, next) {
        console.log('getAllMarksMW');


        markModel.find({
            _course: req.param('id')
        }).exec(function (err, results) {
            if (err) {
                return next(err);
            }

            res.tpl.coursemarks = results;
            console.log(res.tpl.coursemarks);
            return next();
        });
    };

};