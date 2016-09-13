'use strict';

module.exports = function(app) {
  require('./auth-service.js')(app);
};
