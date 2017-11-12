var requireOption = require('../common').requireOption;

/**
 * Get the mark for the markid param
 *  - if there is no such mark, redirect to /courses
 *  - if there is one, put it on res.tpl.currMark
 */
module.exports = function (objectrepository) {
    var markModel = requireOption(objectrepository, 'markModel');
    return function (req, res, next) {
        console.log('getMarkMW');
        return next();
    };

};