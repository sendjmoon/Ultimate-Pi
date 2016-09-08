'use strict';

module.exports = function(app) {
  require('./auth-controller')(app);
  require('./remote-controller')(app);
};
