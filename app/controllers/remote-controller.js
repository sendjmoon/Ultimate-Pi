'use strict';

module.exports = function(app) {
  app.controller('RemoteController', ['$http', '$window', function($http, $window) {
    this.history = [];
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
      let historyArray = [];
      if ($window.localStorage.history === undefined) {
        $window.localStorage.history = btnCommand;
        historyArray.push(btnCommand);
      } else {
        historyArray = JSON.parse($window.localStorage.history);
        historyArray.unshift(btnCommand);
        if (historyArray.length > 5) {
          historyArray.pop();
        }
      }
      
      $window.localStorage.history = JSON.stringify(historyArray);
      this.history = historyArray;
      console.log(historyArray);
      console.log('command: ' + btnCommand);

      $http.get(this.baseUrl + '/api/remote/' + btnCommand)
      .then((res) => {
        console.log('res.data: ' + res.data);
      }).catch((err) => {
        console.log(err);
      });
    };


    this.getHistory = function() {
      if ($window.localStorage.history !== undefined) {
        this.history = JSON.parse($window.localStorage.history);
      } else {
        this.history = 'No History';
      }
    };
  }]);
};
