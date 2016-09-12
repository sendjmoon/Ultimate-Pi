'use strict';

require('!!file?name=[name].[ext]!./html/index.html');
require('./scss/base.scss');

const angular = require('angular');
let ultimateApp = angular.module('ultimateApp', [require('angular-route'), require('angular-jwt')]);
// process.env.APP_SECRET = 'testSecret';

require('./services')(ultimateApp);
require('./controllers')(ultimateApp);
require('./components')(ultimateApp);

ultimateApp.run(['$rootScope', ($rs) => {
  $rs.baseUrl = `${__API_URL__}`,
  $rs.userConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Accept-Content': 'application/json'
    }
  };
}]);

ultimateApp.config(['$routeProvider', ($rp) => {
  $rp
    .when('/home', {
      template: require('./html/home.html')
    })
    .when('/signup', {
      template: require('./html/sign-up.html')
    })
    .when('/signin', {
      template: require('./html/sign-in.html'),
      // resolve: function() {
      //   $location('./home');
      // }
    })
    .otherwise({
      redirectTo: '/home'
    });
}]);
