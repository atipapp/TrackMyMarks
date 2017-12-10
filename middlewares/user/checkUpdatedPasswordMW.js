var requireOption = require('../common').requireOption;

/**
 * Check whether the password is updated correctly
 */
module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (res.tpl.logToConsole) console.log('checkUpdatedPasswordMW');

        if ((typeof req.body.passwordold === 'undefined') ||
            (typeof req.body.password === 'undefined')    ||
            (typeof req.body.passwordagain === 'undefined')) {
            if (res.tpl.logToConsole) console.log('\tNot enough password params were given to update the password.');
            return next();
        }

        var user = res.tpl.user;

        if( (user.password === req.body.passwordold) && (req.body.password === req.body.passwordagain) ){
            if (req.body.password.length > 0) {
                user.password = req.body.password;
                res.tpl.success.push('Jelszó frissítve!');
            }
            if (res.tpl.logToConsole) console.log('\tPassword updated.');
        } else{
            if (res.tpl.logToConsole) console.log('\tPassword mismatch. ')
            res.tpl.error.push('Nem egyeznek a jelszavak!');
        }

        if (req.body.passwordreminder.indexOf(user.password) === -1){
            user.passwordreminder = req.body.passwordreminder;
            res.tpl.success.push('Jelszóemlékeztető frissítve!');
            if (res.tpl.logToConsole) console.log('\tPassword reminder updated.');
        }

        user.save(function (err, result) {
            if (err) {
                return next(err);
            }

            return next();
        });
    };

};