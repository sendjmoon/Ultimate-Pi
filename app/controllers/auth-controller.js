'use strict';

module.exports = (app) => {
  app.controller('AuthController', ['$http', '$location', '$window', 'auth', function($http, $location, $window, auth) {
    if(auth.getToken({noRedirect: true}) && $location.url().includes('home')) $location.path('/home');
    this.signup = function(user) {
      this.showButtons = true;
      $http.post(this.baseUrl + '/api/signup', user)
        .then((res) => {
          auth.setToken(res.data.token);
          $location.path('/home');
        },(err) => {
          alert('error in signup function: ' + err.message);
        });
    };

    this.signin = function(user) {
      this.showButtons = true;
      console.log(user);
      $http.get(this.baseUrl + '/api/signin', {
        headers: {
          'Authorization': 'Basic ' + $window.btoa(user.username + ':' + user.password)
        }
      })
      .then((res) => {
        console.log('signin function: correct info');
        auth.setToken(res.data.token);
        $location.path('/home');
      }, (err) => {
        alert('error in signin function: ' + err.data);
      });
    };

    this.isLoggedIn = function () {
      if (auth.getToken({noRedirect: true}) && auth.getUser()) return true;
    };

    this.getUser = auth.getUser.bind(auth);
    this.logOut = auth.logOut.bind(auth);
    this.currentUser = auth.currentUser;
  }]);
};
