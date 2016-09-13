'use strict';

module.exports = function(app) {
  app.component('signOut', {
    controller: 'AuthController',
    template: require('./sign-out-template.html')
  });
};
