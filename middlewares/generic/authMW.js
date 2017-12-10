/**
 * If the user is not logged in, redirects to /
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {
        if (res.tpl.logToConsole) console.log('authMW');
        if (typeof req.session.userid === 'undefined') {
            return res.redirect('/');
        }
        return next();
    };

};