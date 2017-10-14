var mainRedirectMW = require('../middleware/generic/mainRedirectMW');
var inverseAuthMW = require('../middleware/generic/inverseAuthMW');
var checkUserLoginMW = require('../middleware/user/checkUserLoginMW');
var checkUserRegistrationMW = require('../middleware/user/checkUserRegistrationMW');
var renderMW = require('../middleware/generic/render');

//var userModel = require('../models/user');

module.exports = function (app) {

    var objectRepository = {
        //userModel: userModel
    };

    /**
     * Main page
     */
    app.get('/',
        mainRedirectMW(objectRepository)
    );

    /**
     * Login page
     */
    app.use('/login',
        inverseAuthMW(objectRepository),
        checkUserLoginMW(objectRepository),
        renderMW(objectRepository, 'login')
    );

    /**
     * Registration
     */
    app.use('/registration',
        inverseAuthMW(objectRepository),
        checkUserRegistrationMW(objectRepository),
        renderMW(objectRepository, 'registration')
    );

    /**
     * PWD reminder
     */
    app.use('/pwdreminder',
        inverseAuthMW(objectRepository),
        checkUserRegistrationMW(objectRepository),
        renderMW(objectRepository, 'pwdreminder')
    );

};