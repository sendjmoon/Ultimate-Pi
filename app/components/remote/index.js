'use strict';

module.exports = function(app) {
  app.component('remote', {
    template: require('./remote-template.html'),
    controller: 'RemoteController',
    bindings: {
      baseUrl: '<'
    }
  });
};
