var authMW = require('../middlewares/generic/authMW');
var renderMW = require('../middlewares/generic/render');
var getCourseMW = require('../middlewares/course/getCourseMW');
var saveCourseMW = require('../middlewares/course/saveCourseMW');
var deleteCourseMW = require('../middlewares/course/deleteCourseMW');
var getAllCoursesMW = require('../middlewares/course/getAllCoursesMW');
var getAllMarkMW = require('../middlewares/marks/getAllMarksMW');
var saveMarkMW = require('../middlewares/marks/saveMarkMW');
var mainRedirectMW = require('../middlewares/generic/mainRedirectMW');
var getUserByIdMW = require('../middlewares/user/getUserByIdMW');

var courseModel = require('../models/course');
var markModel = require('../models/mark'); //Erre a getAllMarkMW miatt van szükség
var userModel = require('../models/user');

module.exports = function (app) {
    var objrep = {
        courseModel: courseModel,
        markModel: markModel,
        userModel: userModel
    };

    /**
     * Get course details for a single course.
     */
    app.get('/courses/:id/details',
        authMW(objrep),
        getCourseMW(objrep),
        getAllMarkMW(objrep),
        renderMW(objrep, 'coursedetail'));

    /**
     * Send back the newly created mark.
     */
    app.post('/courses/:id/details',
        authMW(objrep),
        getCourseMW(objrep),
        saveMarkMW(objrep),
        renderMW(objrep, 'coursedetail'));

    /**
     * Get course details for editing.
     */
    app.get('/courses/:id/edit',
        authMW(objrep),
        getCourseMW(objrep),
        renderMW(objrep, 'editcourse'));

    /**
     * Send back the changes.
     */
    app.post('/courses/:id/edit',
        authMW(objrep),
        getCourseMW(objrep),
        saveCourseMW(objrep),
        mainRedirectMW(objrep));

    /**
     * Delete a course by its id
     */
    app.get('/courses/:id/delete',
        authMW(objrep),
        getCourseMW(objrep),
        deleteCourseMW(objrep));

    /**
     * List all courses
     */
    app.get('/courses/',
        authMW(objrep),
        getUserByIdMW(objrep),
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