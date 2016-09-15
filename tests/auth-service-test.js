'use strict';

const angular = require('angular');
let ultimateApp = angular.module('ultimateApp', [require('angular-jwt')]);
require('../app/services')(ultimateApp);

let testUser = {
  username: 'mockTestUser',
  password: '1234',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGQiOiJhdXRoVGVzdFVzZXIiLCJpYXQiOjE0NzM5MTYyNTV9.R7fr7iaNbT0jSVEgqWpRXIb7RAsOJ2TOKzPT8Dim1QM'
};

describe('service: AuthService', function() {
  beforeEach(angular.mock.module('ultimateApp'));

  it('should get the token', angular.mock.inject(function(auth) {
    auth.token = testUser.token;
    let token = auth.getToken();
    expect(token).toBe(testUser.token);

  }));

  it('should set the Token', angular.mock.inject(function(auth) {
    let testToken = testUser.token;
    let testResult = auth.setToken(testToken);
    expect(testResult).toBe(testUser.token);
    expect(auth.token).toBe(testToken);
    
    let token = auth.getToken();
    expect(token).toBe(testUser.token);

  }));

  it('should get the user', angular.mock.inject(function(auth) {
    console.log(auth.user);
    console.log(auth.token);
    let userTest = auth.getUser();
    console.log(userTest);
    
    // auth.user = testUser.username;
    // auth.token = testUser.token;
    expect(auth.user).toBe(undefined);
    // let userTest = auth.getUser();
    // expect(userTest).toBe(testUser);
  }));

  it('should logout the user', angular.mock.inject(function(auth) {
    auth.token = testUser.token;
    auth.currentUser.username = testUser.username;
    auth.logOut();
    expect(auth.token).toBe('');
    expect(Object.keys(auth.currentUser).length === 0).toBe(true);
  }));
});

