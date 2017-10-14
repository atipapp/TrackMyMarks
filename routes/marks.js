module.exports = function (app){
    var authMW = require('../middlewares/generic/authMW');
    var renderMW = require('../middlewares/generic/render');
    var getMarkMW = require('../middlewares/marks/getMarkMW');
    var saveMarkMW = require('../middlewares/marks/saveMarkMW');
    var deleteMarkMW = require('../middlewares/marks/deleteMarkMW');

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