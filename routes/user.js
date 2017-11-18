var authMW = require('../middlewares/generic/authMW');
var renderMW = require('../middlewares/generic/render');
var getUserByIdMW = require('../middlewares/user/getUserByIdMW');
var saveUserByIdMW = require('../middlewares/user/saveUserByIdMW');
var logoutMW = require('../middlewares/user/logoutMW');
var checkUpdatedPasswordMW = require('../middlewares/user/checkUpdatedPasswordMW');

var userModel = require('../models/user');

module.exports = function (app) {
    var objrep = {
        userModel: userModel
    };

    /**
     * Get the user's profile data.
     */
    app.get('/profile',
        authMW(objrep),
        getUserByIdMW(objrep),
        renderMW(objrep, 'profile'));

    /**
     * Save the changes made on the profile.
     */
    app.post('/profile',
        authMW(objrep),
        getUserByIdMW(objrep),
        checkUpdatedPasswordMW(objrep),
        saveUserByIdMW(objrep),
        renderMW(objrep, 'profile'));

    /**
     * Log the user out.
     */
    app.get('/logout',
        authMW(objrep),
        logoutMW(objrep),
        renderMW(objrep, 'index'));
};