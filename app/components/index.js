'use strict';

module.exports = function(app) {
  require('./sign-up')(app);
  require('./sign-in')(app);
  require('./remote')(app);
};