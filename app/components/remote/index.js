'use strict';

module.exports = function(app) {
  app.component('remote', {
    template: require('./remote-template.html'),
    //I would place this in the remote folder to have all the pieces in one location,
    //increases maintainability
    controller: 'RemoteController',
    bindings: {
      baseUrl: '<'
    }
  });
};
