module.exports = function (app){
    var authMW = function () {
        return function (req, res, next) {
            return next();
        }
    }
    var renderMW = require('../middleware/generic/render');
    var getCourseMW = require('../middleware/course/getCourseMW');
    var saveCourseMW = require('../middleware/course/saveCourseMW');
    var deleteCourseMW = require('../middleware/course/deleteCourseMW');
    var getAllCoursesMW = require('../middleware/course/getAllCoursesMW');

    var objrep = {};

    app.get('/courses/details/id',
        authMW(objrep),
        getCourseMW(objrep),
        renderMW(objrep,'coursedetails'));

    app.post('/courses/details/id',
        authMW(objrep),
        saveCourseMW(objrep));

    app.get('/courses/edit/id',
        authMW(objrep),
        getCourseMW(objrep),
        renderMW(objrep,'courseedit'));

    app.post('/courses/edit/id',
        authMW(objrep),
        saveCourseMW(objrep));

    app.get('/courses/delete/id',
        authMW(objrep),
        deleteCourseMW(objrep));

    app.get('/courses/',
        authMW(objrep),
        getAllCoursesMW(objrep),
        renderMW(objrep,'courses'));

    app.post('/courses/',
        authMW(objrep),
        saveCourseMW(objrep));

    app.use('/', function (req, res, next) {
        res.end("itt");
    });
};