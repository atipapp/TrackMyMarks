var requireOption = require('../common').requireOption;

/**
 * Check if the email address is already registered
 */
module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {
        console.log('checkUserRegistrationMW');

        //not enough parameter
        if ((typeof req.body === 'undefined') || (typeof req.body.email === 'undefined') ||
            (typeof req.body.password === 'undefined')) {
            console.log('\tNot enough params were given.');
            return next();
        }

        //lets find the user
        userModel.findOne({
            username: req.body.username
        }, function (err, result) {

            if ((err) || (result !== null)) {
                res.tpl.error.push('Ez a felhasználónév már regisztrálva van!');
                console.log('\tYour username is already registered!.');
            }
        });

        userModel.findOne({
            email: req.body.email
        }, function (err, result) {

            if ((err) || (result !== null)) {
                res.tpl.error.push('Ez az email cím már regisztrálva van!');
                console.log('\tYour email address is already registered!.');
            }

            if (req.body.username.length < 3) {
                res.tpl.error.push('A felhasználónév legalább 3 karakteres!');
                console.log('\tThe username should be at least 3 characters!');
            }

            if (req.body.password !== req.body.passwordagain){
                res.tpl.error.push('Nem egyeznek a jelszavak!');
                console.log('\tThe passwords do not match!');
            }

            return next();
        });
    };
};