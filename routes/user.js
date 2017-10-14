module.exports = function (app){
    var authMW = require('../middleware/generic/authMW');
    var renderMW = require('../middleware/generic/render');
    var getUserByIdMW = require('../middleware/user/getUserByIdMW');
    var saveUserByIdMW = require('../middleware/user/saveUserByIdMW');
    var logoutMW = require('../middleware/user/logoutMW');

    var objrep = {};

    /**
     * Get the user's profile data.
     */
    app.get('/profile',
        authMW(objrep),
        getUserByIdMW(objrep),
        renderMW(objrep,'profile'));

    /**
     * Save the changes made on the profile.
     */
    app.post('/profile',
        authMW(objrep),
        saveUserByIdMW(objrep));

    /**
     * Log the user out.
     */
    app.get('/logout',
        authMW(objrep),
        logoutMW(objrep),
        renderMW(objrep,'logout'));
};