//var requireOption = require('../common').requireOption;

/**
 * Log out a user
 * and remove it from res.tpl.user
 */
module.exports = function (objectrepository) {

    //var userModel = requireOption(objectrepository,'userModel');

    return function (req, res, next) {
        return next();
    };

};