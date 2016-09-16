'use strict';

const angular = require('angular');
let ultimateApp = angular.module('ultimateApp', [require('angular-route'), require('angular-jwt')]);

require('../app/services')(ultimateApp);
require('../app/controllers')(ultimateApp);
require('../app/components')(ultimateApp);

describe('auth controller signin/signup/signout tests', function() {
  beforeEach(angular.mock.module('ultimateApp'));
  beforeEach(angular.mock.inject((_$controller_, $httpBackend, _auth_, _$window_) => {
    this.ctrl = _$controller_('AuthController');
    this.window = _$window_;
    this.ctrl.user = {
      username: 'mockTestUser',
      password: '1234',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGQiOiJhdXRoVGVzdFVzZXIiLCJpYXQiOjE0NzM5MTYyNTV9.R7fr7iaNbT0jSVEgqWpRXIb7RAsOJ2TOKzPT8Dim1QM'
    };
    this.auth = _auth_;
    this.auth.getToken = (user) => {
      if (user.token === undefined) return false;
      return user.token;
    };
    this.auth.getUser = () => {
      return this.ctrl.user;
    };
    this.auth.setToken = (token) => {
      token = this.ctrl.user.token || '';
      this.ctrl.token = token;
    };
    this.auth.logOut = () => {
      this.ctrl.user = {};
    };
    this.$httpBackend = $httpBackend;
  }));

  it('should be a controller', () => {
    expect(typeof this.ctrl.signin).toBe('function');
    expect(typeof this.ctrl.signup).toBe('function');
    expect(typeof this.ctrl.isLoggedIn).toBe('function');
    expect(typeof this.ctrl.doSomething).toBe('function');
  });

  // Testing signup component input and Auth controller function
  it('should sign up a user', () => {
    let requestData = {
      username: this.ctrl.user.username,
      password: this.ctrl.user.password,
      token: this.ctrl.user.token
    };
    console.log(requestData);
    this.$httpBackend.expectPOST('undefined/api/signup', requestData)
    .respond(200, {
      data: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGQiOiJhdXRoVGVzdFVzZXIiLCJpYXQiOjE0NzM5MTYyNTV9.R7fr7iaNbT0jSVEgqWpRXIb7RAsOJ2TOKzPT8Dim1QM'
      }
    });
    this.ctrl.signup({username: this.ctrl.user.username, password: this.ctrl.user.password, token: this.ctrl.user.token});
    this.$httpBackend.flush();
  });

  // Testing sign in component and Auth controller function
  it('should sign in a user', () => {
    let requestHeaders = {
      'Authorization': 'Basic ' + this.window.btoa(this.ctrl.user.username + ':' + this.ctrl.user.password),
      'Accept': 'application/json, text/plain, */*'
    };
    let testUser = {
      username: 'mockTestUser',
      password: '1234',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGQiOiJhdXRoVGVzdFVzZXIiLCJpYXQiOjE0NzM5MTYyNTV9.R7fr7iaNbT0jSVEgqWpRXIb7RAsOJ2TOKzPT8Dim1QM'
    };


    this.$httpBackend.expectGET('undefined/api/signin', requestHeaders)
    .respond(200, { 
      data: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGQiOiJhdXRoVGVzdFVzZXIiLCJpYXQiOjE0NzM5MTYyNTV9.R7fr7iaNbT0jSVEgqWpRXIb7RAsOJ2TOKzPT8Dim1QM'
      }
    });

    this.ctrl.signin(testUser);
    this.$httpBackend.flush();
  });
});