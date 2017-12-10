var expect = require('chai').expect;
var mainRedirectMW = require('../../../middlewares/generic/mainRedirectMW');

describe('mainRedirectMW', function () {
    describe('User logged in', function () {
        it('should call res.redirect to /courses if the userid in session exists', function (done) {


            var reqMock = {
                session: {
                    userid: '5'
                }
            };
            var resMock = {
                redirect: function (newUrl) {
                    expect(newUrl).be.eql('/courses');
                    done();
                },
                tpl : {
                    logToConsole: false
                }
            };
            mainRedirectMW({})(reqMock, resMock, function () {
            });


        });
    });

    describe('User not logged in', function () {
        it('should call res.redirect to /login if the userid in session exists', function (done) {
            var reqMock = {
                session: {
                }
            };
            var resMock = {
                redirect: function (newUrl) {
                    expect(newUrl).be.eql('/login');
                    done();
                },
                tpl : {
                    logToConsole: false
                }
            };
            mainRedirectMW({})(reqMock, resMock, function () {

            });


        });
    });
});