'use strict';

module.exports = function(app) {
  require('./sign-out')(app);
  require('./sign-up')(app);
  require('./sign-in')(app);
  require('./remote')(app);
  require('./nav-bar')(app);
  require('./about')(app);
};
