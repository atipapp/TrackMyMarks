var expect = require('chai').expect;
var checkUserRegistrationMW = require('../../../middlewares/user/checkUserRegistrationMW');

describe('checkUserRegistrationMW (checks whether the user is registered and passwords match)', function () {

    describe('should call next when', function () {
        it('not enough params were given', function (done) {
            var fakeUserModel = {
            };

            var reqMock = {
            };
            var resMock = {
                tpl: {
                    logToConsole: false
                }
            };

            checkUserRegistrationMW({
                userModel: fakeUserModel
            })(reqMock, resMock, function () {
                done();
            });


        });

        it('this user is already registered', function (done) {
            var fakeUserModel = {
                findOne: function (some, cb) {
                    cb(null, 'Valami');
                }
            };

            var reqMock = {
                body: {
                    email: 'lorem@ipsum.com',
                    password: 'teszt',
                    username: 'teszt',
                    passwordagain: 'teszt'
                }
            };
            var resMock = {
                tpl: {
                    logToConsole: false,
                    error: []
                }
            };

            checkUserRegistrationMW({
                userModel: fakeUserModel
            })(reqMock, resMock, function () {
                expect(resMock.tpl.error.length).be.eql(2);
                expect(resMock.tpl.error[0]).be.eql('Ez a felhasználónév már regisztrálva van!');
                expect(resMock.tpl.error[1]).be.eql('Ez az email cím már regisztrálva van!');
                done();
            });


        });

        it('username is not long enough', function (done) {
            var fakeUserModel = {
                findOne: function (some, cb) {
                    cb(null, null);
                }
            };

            var reqMock = {
                body: {
                    email: 'lorem@ipsum.com',
                    password: 'teszt',
                    username: 'a',
                    passwordagain: 'teszt'
                }
            };
            var resMock = {
                tpl: {
                    logToConsole: false,
                    error: []
                }
            };

            checkUserRegistrationMW({
                userModel: fakeUserModel
            })(reqMock, resMock, function () {
                expect(resMock.tpl.error.length).be.eql(1);
                expect(resMock.tpl.error[0]).be.eql('A felhasználónév legalább 3 karakteres!');
                done();
            });

        });

        it('passwords do not match', function (done) {
            var fakeUserModel = {
                findOne: function (some, cb) {
                    cb(null, null);
                }
            };

            var reqMock = {
                body: {
                    email: 'lorem@ipsum.com',
                    password: 'teszt',
                    username: 'aaa',
                    passwordagain: 'teszt1'
                }
            };
            var resMock = {
                tpl: {
                    logToConsole: false,
                    error: []
                }
            };

            checkUserRegistrationMW({
                userModel: fakeUserModel
            })(reqMock, resMock, function () {
                expect(resMock.tpl.error.length).be.eql(1);
                expect(resMock.tpl.error[0]).be.eql('Nem egyeznek a jelszavak!');
                done();
            });

        });

        it('empty object repository', function (done) {
            var fakeUserModel = {
                findOne: function (some, cb) {
                    cb(null, null);
                }
            };

            var reqMock = {
                body: {
                    email: 'lorem@ipsum.com',
                    password: 'teszt',
                    username: 'aaa',
                    passwordagain: 'teszt1'
                }
            };
            var resMock = {
                tpl: {
                    logToConsole: false,
                    error: []
                }
            };

            try{
                checkUserRegistrationMW({
                })();
            } catch (err){
                done();
            }


        });
    });
});