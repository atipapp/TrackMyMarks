/**
 * This temporary middleware has one purpose, when the user saves the mark it redirects
 * to the course's detailed page.
 *
 * It will be removed when user auth is enabled. Only for demo purposes.
 */
//TODO: remove this MW
module.exports = function (objectrepository) {


    return function (req, res, next) {
        console.log('tempRedirectMW');
        //return next();
        return res.redirect('/courses/details/id');
    };



};