var authMW = require('../middlewares/generic/authMW');
var renderMW = require('../middlewares/generic/render');
var getMarkMW = require('../middlewares/marks/getMarkMW');
var deleteMarkMW = require('../middlewares/marks/deleteMarkMW');


var markModel = require('../models/mark');

module.exports = function (app) {
    var objrep = {
        markModel: markModel
    };

    /**
     * Delete the mark by its id.
     */
    app.get('/marks/:id/delete',
        authMW(objrep),
        getMarkMW(objrep),
        deleteMarkMW(objrep));
};