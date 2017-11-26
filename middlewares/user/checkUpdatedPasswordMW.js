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
            console.log('\tNot enough password params were given to update the password.');
            return next();
        }

        var user = res.tpl.user;

        if( (user.password === req.body.passwordold) && (req.body.password === req.body.passwordagain) ){
            if (req.body.password.length > 0) {
                user.password = req.body.password;
                res.tpl.success.push('Jelszó frissítve!');
            }
            console.log('\tPassword updated.');
        } else{
            console.log('\tPassword mismatch. ')
            res.tpl.error.push('Nem egyeznek a jelszavak!');
        }

        if (req.body.passwordreminder.indexOf(user.password) === -1){
            user.passwordreminder = req.body.passwordreminder;
            res.tpl.success.push('Jelszóemlékeztető frissítve!');
            console.log('\tPassword reminder updated.');
        }

        user.save(function (err, result) {
            if (err) {
                return next(err);
            }

            return next();
        });
    };

};