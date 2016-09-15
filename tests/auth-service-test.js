'use strict';

const angular = require('angular');
let ultimateApp = angular.module('ultimateApp', [require('angular-jwt')]);
require('../app/services')(ultimateApp);

describe('service: AuthService', function() {
  beforeEach(angular.mock.module('ultimateApp'));
  var auth, store;
  beforeEach(angular.mock.inject('ultimateApp', function(_auth_) {
    store = {};
    auth = _auth_;
    this.testUser = {
      username: 'mockTestUser', 
      password: '1234',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGQiOiJhdXRoVGVzdFVzZXIiLCJpYXQiOjE0NzM5MTYyNTV9.R7fr7iaNbT0jSVEgqWpRXIb7RAsOJ2TOKzPT8Dim1QM'
    }
    // this.localStorage = window.localStorage;
    spyOn(auth, 'getToken').and.callFake(() => {
      if (!store.token) return false;
      return store.token;
    });
    spyOn(auth, 'setToken').and.callFake((value) => {
      return store.token = value + '';
    });
    spyOn(auth, 'logOut').and.callFake(() => {
      store.token = '';
      auth.currentUser = {}
    });
    spyOn(auth, 'getUser').andCallFake(() => {
      let token = auth.getToken()
      if (token.length > 0) {
        auth.currentUser = this.testUser.username; 
        return this.testUser;
      } 
      return false;
    });

  }));

  it('should get the token', () => {
    let token = auth.getToken();
    expect(token).toBe(false);

  });

  it('should set the Token', () => {
    let setToken = auth.setToken(this.testUser.token);
    // let setToken = testUser.token;
    // let returnToken = auth.setToken(setToken);
    expect(setToken).toBe(store.token);
    
    let token = auth.getToken();
    expect(token).toBe(this.testUser.token);
    expect(token).to.not.Equal(false);
  });

  it('should get the user', () => {
    let user = auth.getUser();
    expect(user).toBe(false);
    auth.setToken(this.testUser.token);
    user = auth.getUser();
    expect(auth.currentUser).toBe(this.testUser.username);
  });

  it('should logout the user', angular.mock.inject(function(auth) {
    auth.setToken(this.testUser.token);
    auth.logOut();
    expect(auth.getToken()).toBe('');
    expect(auth.currentUser.username).toBe(undefined);
  }));
});

