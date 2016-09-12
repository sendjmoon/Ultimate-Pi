'use strict';

module.exports = (app) => {
  app.controller('AuthController', ['$http', '$location', '$window', function($http, $location, $window) {
    this.signup = function(user) {
      $http.post(this.baseUrl + '/api/signup', user)
        .then((res) => {
          // Unsecure
          $http.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
          $location.path('/home');
        })
        .catch((err) => {
          alert('error in signup function: ' + err.data);
        });
    };

    this.signin = function(user) {
      console.log(user);
      $http.get(this.baseUrl + '/api/signin', {
        headers: {
          'Authorization': 'Basic ' + $window.btoa(user.username + ':' + user.password)
        }
      })
      .then((res) => {
        console.log('signin function: correct info');
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
        $location.path('/home');
      })
      .catch((err) => {
        alert('error in signin function: ' + err.data);
      });

    };
  }]);
};
