var requireOption = require('../common').requireOption;

/**
 * Log out the user
 * and remove it from res.tpl.user
 */
module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository,'userModel');

    return function (req, res, next) {
        req.session.destroy(function (err) {
            return next();
        });
    };

};