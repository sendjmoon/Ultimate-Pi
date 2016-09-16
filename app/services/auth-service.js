'use strict';

module.exports = function(app) {
  app.factory('auth', ['$window', 'jwtHelper', '$location',  function($window, jwtHelper, $location) {
    return {
      currentUser: {},
      getToken: function(options) {
        options = options || {};
        if (this.token) return this.token;
        if ($window.localStorage.token) return this.setToken($window.localStorage.token);
        if ($window.localStorage.token === '') {
          delete $window.localStorage.token;
          $location.path('/signin');
          return; 
        }
        if (!options.noRedirect) $location.path('/signup');
      },

      setToken: function(token) {
        $window.localStorage.token = token;
        this.token = token;
        this.getUser();
        return token;
      },

      getUser: function() {
        let token = this.getToken();
        if (!token) return false;
        let decoded = jwtHelper.decodeToken(token);
        this.currentUser.username = decoded.idd;
        return this.currentUser;
      },

      logOut: function() {
        console.log('logout fxn');
        delete $window.localStorage.history;
        $window.localStorage.token = '';
        this.currentUser = {};
        this.token = '';
        $location.path('/signin');
      }
    };
  }]);
};
