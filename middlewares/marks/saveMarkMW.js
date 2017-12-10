var requireOption = require('../common').requireOption;

/**
 * Save the mark for the markid param
 *  - if there is no such mark, create it
 *  - if there is one, save it
 */
module.exports = function (objectrepository) {

    var markModel = requireOption(objectrepository, 'markModel');

    function saveCallback(res, next, mark, logToConsole) {
        if (mark.date === null){
            var today = new Date();
            today.setHours(0, 0, 0, 0);
            if (logToConsole) console.log('\tEmpty date field. Setting todays date.');
            mark.date = today;
        }

        mark.save(function (err, result) {
            if (err) {
                return next(err);
            }

            return res.redirect('/courses/' + res.tpl.course.id + '/details/');
        });
    }

    return function (req, res, next) {
        if (res.tpl.logToConsole) console.log('saveMarkMW');

        if (typeof req.body.value === 'undefined' ||
            typeof req.body.date === 'undefined' ||
            typeof req.body.details === 'undefined') {
            return next();
        }

        var mark = undefined;
        if (typeof res.tpl.currentmark !== 'undefined') {
            mark = res.tpl.currentmark;
            mark.value = req.body.newmark.value;
            mark.date = req.body.newmark.date;
            mark.details = req.body.newmark.details;
            mark._course = res.tpl.course.id;

            if (res.tpl.logToConsole) console.log('\tMark updated');

            return saveCallback(res, next, mark, res.tpl.logToConsole);
        } else {
            mark = new markModel();
            mark.value = req.body.value;
            mark.date = req.body.date;
            mark.details = req.body.details;
            mark._course = res.tpl.course.id;

            if (res.tpl.logToConsole) console.log('\tMark created');

            return saveCallback(res, next, mark, res.tpl.logToConsole);

        }
    }
};