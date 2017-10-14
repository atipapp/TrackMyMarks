module.exports = function (app){
    var authMW = require('../middleware/generic/authMW');
    var renderMW = require('../middleware/generic/render');
    var getMarkMW = require('../middleware/marks/getMarkMW');
    var saveMarkMW = require('../middleware/marks/saveMarkMW');
    var deleteMarkMW = require('../middleware/marks/deleteMarkMW');

    var objrep = {};

    /**
     * Edit one given mark's parameters.
     */
    app.get('/marks/edit/id',
        authMW(objrep),
        getMarkMW(objrep),
        renderMW(objrep,'markedit'));

    /**
     * Save the modified mark.
     */
    app.post('/marks/edit/id',
        authMW(objrep),
        saveMarkMW(objrep));

    /**
     * Delete the mark by its id.
     */
    app.get('/marks/delete/id',
        authMW(objrep),
        deleteMarkMW(objrep));
};