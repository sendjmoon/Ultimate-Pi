'use strict';

module.exports = function(app) {
  app.component('about', {
    template: require('./about-template.html')
  });
};
