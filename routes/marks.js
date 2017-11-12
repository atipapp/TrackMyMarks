var authMW = require('../middlewares/generic/authMW');
var renderMW = require('../middlewares/generic/render');
var getMarkMW = require('../middlewares/marks/getMarkMW');
var saveMarkMW = require('../middlewares/marks/saveMarkMW');
var deleteMarkMW = require('../middlewares/marks/deleteMarkMW');
var tempRedirectMW = require('../middlewares/generic/tempRedirectMW');

var markModel = require('../models/mark');

module.exports = function (app) {
    var objrep = {
        markModel: markModel
    };

    /**
     * Edit one given mark's parameters.
     */
    app.get('/marks/edit/id',
        authMW(objrep),
        getMarkMW(objrep),
        renderMW(objrep, 'editmark'));

    /**
     * Save the modified mark.
     */
    app.post('/marks/edit/id',
        authMW(objrep),
        saveMarkMW(objrep),
        tempRedirectMW(objrep));

    /**
     * Delete the mark by its id.
     */
    app.get('/marks/delete/id',
        authMW(objrep),
        deleteMarkMW(objrep),
        tempRedirectMW(objrep));
};