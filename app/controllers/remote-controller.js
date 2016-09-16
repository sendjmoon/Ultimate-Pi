'use strict';

module.exports = function(app) {
  app.controller('RemoteController', ['$http', function($http) {

    this.getButtons = function() {
      let dataJSON = require('../lib/data/remote-data.js');
      console.log(dataJSON);
      let buttonArray = [];
      dataJSON.forEach(function(index) {
        buttonArray.push(index);
      });
      this.buttons = buttonArray;
    };

    this.pressButton = function(btnCommand) {
      console.log('command: ' + btnCommand);
      $http.get(this.baseUrl + '/api/remote/' + btnCommand)
      .then((res) => {
        console.log('res.data: ' + res.data);
      }).catch((err) => {
        console.log(err);
      });
    };
  }]);
};
