module.exports = function (app){
    var authMW = require('../middleware/generic/authMW');
    var renderMW = require('../middleware/generic/render');
    var getUserByIdMW = require('../middleware/user/getUserByIdMW');
    var saveUserByIdMW = require('../middleware/user/saveUserByIdMW');
    var logoutMW = require('../middleware/user/logoutMW');

    var objrep = {};

    app.get('/profile',
        authMW(objrep),
        getUserByIdMW(objrep),
        renderMW(objrep,'profile'));

    app.post('/profile',
        authMW(objrep),
        saveUserByIdMW(objrep));

    app.get('/logout',
        authMW(objrep),
        logoutMW(objrep),
        renderMW(objrep,'logout'));

    app.use('/', function (req, res, next) {
        res.end("itt");
    });
};