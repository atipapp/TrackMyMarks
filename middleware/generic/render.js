//var requireoption = require('../common').requireOption();

/**
 * Using the template engine render the values into the template
 */
module.exports = function (objectrepository, viewName) {

    //var db = requireoption(objectrepository,'db');

    return function (req, res, next) {
        res.end('Render: ' + viewName);
        //res.render(viewName, res.tpl);
    };

};