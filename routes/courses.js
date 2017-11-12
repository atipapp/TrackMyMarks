var authMW = require('../middlewares/generic/authMW');
var renderMW = require('../middlewares/generic/render');
var getCourseMW = require('../middlewares/course/getCourseMW');
var saveCourseMW = require('../middlewares/course/saveCourseMW');
var deleteCourseMW = require('../middlewares/course/deleteCourseMW');
var getAllCoursesMW = require('../middlewares/course/getAllCoursesMW');
var getAllMarkMW = require('../middlewares/marks/getAllMarksMW');
var saveMarkMW = require('../middlewares/marks/saveMarkMW');
var mainRedirectMW = require('../middlewares/generic/mainRedirectMW');

var courseModel = require('../models/course');
var markModel = require('../models/mark'); //Erre a getAllMarkMW miatt van szükség

module.exports = function (app) {
    var objrep = {
        courseModel: courseModel,
        markModel: markModel
    };

    /**
     * Get course details for a single course.
     */
    app.get('/courses/details/id',
        authMW(objrep),
        getCourseMW(objrep),
        getAllMarkMW(objrep),
        renderMW(objrep, 'coursedetail'));

    /**
     * Send back the newly created mark.
     */
    app.post('/courses/details/id',
        authMW(objrep),
        saveMarkMW(objrep),
        renderMW(objrep, 'coursedetail'));

    /**
     * Get course details for editing.
     */
    app.get('/courses/edit/id',
        authMW(objrep),
        getCourseMW(objrep),
        renderMW(objrep, 'editcourse'));

    /**
     * Send back the changes.
     */
    app.post('/courses/edit/id',
        authMW(objrep),
        saveCourseMW(objrep),
        mainRedirectMW(objrep));

    /**
     * Delete a course by its id
     */
    app.get('/courses/details/:id/delete',
        authMW(objrep),
        getCourseMW(objrep),
        deleteCourseMW(objrep));

    /**
     * List all courses
     */
    app.get('/courses/',
        authMW(objrep),
        getAllCoursesMW(objrep),
        renderMW(objrep, 'courses'));

    /**
     * Send back the newly created course.
     */
    app.post('/courses/',
        authMW(objrep),
        saveCourseMW(objrep),
        function (req, res, next) {
            return res.redirect('/courses');
        }
    );
    //renderMW(objrep, 'courses'));
};