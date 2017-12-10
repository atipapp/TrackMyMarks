var requireOption = require('../common').requireOption;

/**
 * Get the mark for the markid param
 *  - if there is no such mark, redirect to /courses
 *  - if there is one, put it on res.tpl.currMark
 */
module.exports = function (objectrepository) {
    var markModel = requireOption(objectrepository, 'markModel');
    return function (req, res, next) {
        if (res.tpl.logToConsole) console.log('getMarkMW');

        markModel.findOne({
            _id: req.param('id')
        }).populate('_course').exec(function (err, result) {
            if ((err) || (!result)) {
                return res.redirect('/courses/');
            }

            res.tpl.currentmark = result;
            return next();
        });
    };

};