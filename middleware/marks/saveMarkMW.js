//var requireOption = require('../common').requireOption;

/**
 * Save the mark for the markid param
 *  - if there is no such mark, create it
 *  - if there is one, save it
 */
module.exports = function (objectrepository) {
    return function (req, res, next) {
        console.log('saveMarkMW');
        return next();
    };

};