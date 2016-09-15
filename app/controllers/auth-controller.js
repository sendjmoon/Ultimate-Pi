'use strict';

module.exports = (app) => {
  app.controller('AuthController', ['$http', '$location', '$window', 'auth', function($http, $location, $window, auth) {
    this.isCollasped = true;
    this.collapsedClass = this.isCollasped ? 'collapse': '';
    this.doSomething = function(){
      this.isCollasped = !this.isCollasped;
      this.collapsedClass = this.isCollasped ? 'collapse': '';
    };
    console.log($location.url());
    if (auth.getToken({noRedirect: true}) && $location.url().includes('home')) $location.path('/home');
    // if(!auth.getToken()) $location.path('/signup');
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
      if (auth.getToken() && auth.getUser().username.length > 0) return true;
    };



    this.getUser = auth.getUser.bind(auth);
    this.logOut = auth.logOut.bind(auth);
    this.currentUser = auth.currentUser;
    this.toggleView = auth.toggleView;
  }]);
};
