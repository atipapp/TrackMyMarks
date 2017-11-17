var requireOption = require('../common').requireOption;

/**
 * Save a user (if exists) with the :userid param
 * and put it on res.tpl.user
 */
module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository,'userModel');

    return function (req, res, next) {
        console.log('saveUserByIdMW');

        console.log("\tUsername:" + req.body.username); //DEBUG
        console.log("\tFullname:" + req.body.fullname); //DEBUG

        if ((typeof req.body.username === 'undefined') ||
            (typeof req.body.email === 'undefined') ||
            (typeof req.body.password === 'undefined')) {
            return next();
        }

        var user = undefined;

        if (typeof res.tpl.user !== 'undefined') {
            user = res.tpl.user;
        } else {
            user = new userModel();
        }

        user.username = req.body.username;
        user.fullname = req.body.fullname;
        user.email = req.body.email;
        user.password = req.body.password;

        user.save(function (err, result) {
            if (err) {
                return next(err);
            }

            return res.redirect('/courses/');
        });
    };

};