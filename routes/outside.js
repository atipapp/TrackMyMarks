var mainRedirectMW = require('../middlewares/generic/mainRedirectMW');
var inverseAuthMW = require('../middlewares/generic/inverseAuthMW');
var checkUserLoginMW = require('../middlewares/user/checkUserLoginMW');
var checkUserRegistrationMW = require('../middlewares/user/checkUserRegistrationMW');
var renderMW = require('../middlewares/generic/render');
var saveUserByIdMW = require('../middlewares/user/saveUserByIdMW');


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
        saveUserByIdMW(objectRepository),
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