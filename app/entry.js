'use strict';

require('!!file?name=[name].[ext]!./html/index.html');
require('./scss/base.scss');

const angular = require('angular');
let ultimateApp = angular.module('ultimateApp', [require('angular-route')]);

require('./controllers')(ultimateApp);
require('./components')(ultimateApp);

ultimateApp.run(['$rootScope', ($rs) => {
  $rs.baseUrl = `${__API_URL__}/api/user`,
  $rs.userConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Accept-Content': 'application/json'
    }
  };
}]);

ultimateApp.config(['$routeProvider', '$location', ($rp, $location) => {
  $rp
    .when('/signup', {
      template: require('./html/sign-up.html')
    })
    .when('signin', {
      template: require('./html/sign-in.html'),
      // resolve: function() {
      //   $location('./home');
      // }
    })
    .when('./home', {
      template: require('./html/home.html')
    })
    .otherwise({
      redirectTo: './home'
    });
}]);