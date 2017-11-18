var requireOption = require('../common').requireOption;

/**
 * Check whether the password is updated correctly
 */
module.exports = function (objectrepository) {
    return function (req, res, next) {
        console.log('checkUpdatedPasswordMW');

        if ((typeof req.body.passwordold === 'undefined') ||
            (typeof req.body.password === 'undefined')    ||
            (typeof req.body.passwordagain === 'undefined')) {
            console.log('Not enough password params were given.');
            return next();
        }

        var user = res.tpl.user;

        if( (user.password === req.body.passwordold) && (req.body.password === req.body.passwordagain) ){
            user.password = req.body.password;
            console.log('Password updated.');
        }

        console.log(user);

        user.save(function (err, result) {
            if (err) {
                return next(err);
            }

            return res.redirect('/courses/');
        });
    };

};