'use strict';

module.exports = function(app) {
  app.component('signUp', {
    controller: 'AuthController',
    template: require('./sign-up-template.html'),
    bindings: {
      baseUrl: '<'
    }
  });
};