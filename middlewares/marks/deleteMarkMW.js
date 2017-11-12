var requireOption = require('../common').requireOption;

/**
 * Delete the mark for the markid param
 *  - if there is no such mark, redirect to /courses
 *  - if there is one, delete it
 */
module.exports = function (objectrepository) {
    var markModel = requireOption(objectrepository, 'markModel');

    return function (req, res, next) {
        console.log('deleteMarkMW');


        if (typeof res.tpl.currentmark === 'undefined') {
            return next();
        }

        res.tpl.currentmark.remove();
        return res.redirect('/courses/' + res.tpl.currentmark._course.id + '/details/');

    };
}