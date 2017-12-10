var expect = require('chai').expect;
var mainRedirectMW = require('../../../middlewares/generic/mainRedirectMW');

describe('mainRedirectMW (redirects to the correct page based on the userid in session)', function () {
    describe('should redirect to /courses', function () {
        it('if the userid in session exists', function (done) {
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
                tpl: {
                    logToConsole: false
                }
            };
            mainRedirectMW({})(reqMock, resMock, function () {
            });
        });
    });

    describe('should redirect to /login ', function () {
        it('if the userid in session does not exist', function (done) {
            var reqMock = {
                session: {}
            };
            var resMock = {
                redirect: function (newUrl) {
                    expect(newUrl).be.eql('/login');
                    done();
                },
                tpl: {
                    logToConsole: false
                }
            };
            mainRedirectMW({})(reqMock, resMock, function () {
            });
        });
    });
});