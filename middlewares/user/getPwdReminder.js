var requireOption = require('../common').requireOption;

/**
 * Load a pwd reminder (if exists) with the :userid param
 * and put it on res.tpl.reminder
 */
module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository,'userModel');

    return function (req, res, next) {
        console.log('getPwdReminder');

        //not enough parameter
        if (!(req.body.email)) {
            console.log('Not enough param. req.body.email = ' + req.body.email);
            return next();
        }

        //lets find the reminder
        userModel.findOne({email: req.body.email}, function (err, result) {
            if (err) {
                return next(err);
            }

            if (result !== null) res.tpl.reminder = result.passwordreminder;
            else res.tpl.reminder = null;
            console.log('\tReminder: ' + res.tpl.reminder);

            return next();
        });

    };

};