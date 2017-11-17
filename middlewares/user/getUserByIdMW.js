var requireOption = require('../common').requireOption;

/**
 * Load a user (if exists) with the :userid param
 * and put it on res.tpl.user
 */
module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository,'userModel');

    return function (req, res, next) {
        console.log('getUserByIdMW');

        //not enough parameter
        if (!(req.session.userid)) {
            console.log('Not enough param. req.session.userid = ' + req.session.userid);
            return next();
        }

        //lets find the user
        userModel.findOne({_id: req.session.userid}, function (err, result) {
            if (err) {
                return next(err);
            }

            res.tpl.user = result;
            console.log('Username: ' + res.tpl.user.username);

            return next();
        });

    };

};