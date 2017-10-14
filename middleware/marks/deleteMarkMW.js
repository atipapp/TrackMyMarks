//var requireOption = require('../common').requireOption;

/**
 * Delete the mark for the markid param
 *  - if there is no such mark, redirect to /courses
 *  - if there is one, delete it
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {
        return next();
    };

};