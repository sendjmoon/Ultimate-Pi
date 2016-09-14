'use strict';

module.exports = function(app) {
  app.component('navBar', {
    controller: 'AuthController',
    template: require('./nav-bar-template.html'),
    bindings: {
      baseUrl: '<'
    }
  });
};
