'use strict';

module.exports = function(app) {
  app.component('navBar', {
    controller: 'NavController',
    template: require('./nav-bar-template.html'),
    bindings: {
      baseUrl: '<'
    }
  });
};
