'use strict';

module.exports = function(app) {
  app.controller('RemoteController', ['$http', function($http) {
    console.log('remote controller');
  }]);
};
