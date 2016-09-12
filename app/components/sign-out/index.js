'use strict';

module.exports = (app) => {
  app.component('signOut', {
    controller: 'AuthController',
    template: require('./sign-out-template.html')
  });
};