var requireOption = require('../common').requireOption;

/**
 * Save a user (if exists) with the :userid param
 * and put it on res.tpl.user
 */
module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {
        if (res.tpl.logToConsole) console.log('saveUserByIdMW');

        if (res.tpl.error.length === 0) {
            if ((typeof req.body.username === 'undefined') ||
                (typeof req.body.email === 'undefined')) {
                return next();
            }

            var user = undefined;

            if (typeof res.tpl.user !== 'undefined') {
                user = res.tpl.user;
                res.tpl.success.push('Sikeres mentés!');
            } else {
                user = new userModel();
                user.username = req.body.username;
                user.password = req.body.password;
                res.tpl.success.push('Sikeres regisztráció!');
            }

            user.fullname = req.body.fullname;
            user.email = req.body.email;

            user.save(function (err, result) {
                if (err) {
                    return next(err);
                }

                return next();
            });
        }
        else{
            if (res.tpl.logToConsole) console.log('\tNo save occured, because there were errors.');
            return next();
        }
    };

};