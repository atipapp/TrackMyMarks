var requireOption = require('../common').requireOption;

/**
 * Get all the marks to a course
 *  put it on res.tpl
 */
module.exports = function (objectrepository) {
    var markModel = requireOption(objectrepository, 'markModel');
    return function (req, res, next) {
        console.log('getAllMarksMW');
        return next();
    };

};