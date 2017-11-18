var requireOption = require('../common').requireOption;

/**
 * Save the mark for the markid param
 *  - if there is no such mark, create it
 *  - if there is one, save it
 */
module.exports = function (objectrepository) {

    var markModel = requireOption(objectrepository, 'markModel');

    function saveCallback(res, next, mark) {
        if (mark.date === null){
            var today = new Date();
            today.setHours(0, 0, 0, 0);
            console.log('\tEmpty date field. Setting todays date: ' + today);
            mark.date = today;
        }

        mark.save(function (err, result) {
            if (err) {
                return next(err);
            }
            console.log(mark);

            return res.redirect('/courses/' + res.tpl.course.id + '/details/');
        });
    }

    return function (req, res, next) {
        console.log('saveMarkMW');

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

            return saveCallback(res, next, mark);
        } else {
            mark = new markModel();
            mark.value = req.body.value;
            mark.date = req.body.date;
            mark.details = req.body.details;
            mark._course = res.tpl.course.id;

            return saveCallback(res, next, mark);

        }
    }
};