module.exports = function (app){
    var authMW = require('../middleware/generic/authMW');
    var renderMW = require('../middleware/generic/render');
    var getMarkMW = require('../middleware/marks/getMarkMW');
    var saveMarkMW = require('../middleware/marks/saveMarkMW');
    var deleteMarkMW = require('../middleware/marks/deleteMarkMW');

    var objrep = {};

    app.get('/marks/edit/id',
        authMW(objrep),
        getMarkMW(objrep),
        renderMW(objrep,'markedit'));

    app.post('/marks/edit/id',
        authMW(objrep),
        saveMarkMW(objrep));

    app.get('/marks/delete/id',
        authMW(objrep),
        deleteMarkMW(objrep));

    app.use('/', function (req, res, next) {
        res.end("itt");
    });
};