'use strict';

const angular = require('angular');
let testApp = angular.module('testApp', [require('angular-jwt')]);
require('../app/services')(testApp);

describe('service: AuthService', function() {
  beforeEach(angular.mock.module('testApp'));

  it('should get the token', angular.mock.inject(function(auth) {
    this.token = 'testToken';
    let token = auth.getToken();
    expect(token).toBe('testToken');

  }));

  it('should set the Token', angular.mock.inject(function(auth) {
    let testToken = 'testingSetToken';
    let testResult = auth.setToken(testToken);
    expect(testResult).toBe(testToken);
    expect(auth.token).toBe(testToken);
    
    let token = auth.getToken();
    expect(token).toBe(testToken);

  }));

  it('should get the user', angular.mock.inject(function(auth) {
    let noUserTest = auth.getUser();
    expect(noUserTest).toBe(false);
    expect(auth.currentUser).toBe(undefined);
    
    auth.currentUser = 'testUser';
    auth.token = 'testToken'; // Need a token to reach return statement
    let userTest = auth.getUser();
    expect(userTest).toBe('testUser');
  }));

  it('should logout the user', angular.mock.inject(function(auth) {
    auth.token = 'testToken';
    auth.currentUser.username = 'logoutTestUser';
    auth.logOut();
    expect(auth.token).toBe('');
    expect(auth.currentUser).toBe({});
  }));
});

