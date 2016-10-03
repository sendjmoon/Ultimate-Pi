'use strict';

module.exports = function(app) {
  //the name of this controller entertains me 
  app.controller('RemoteController', ['$http', '$window', function($http, $window) {
    this.history = [];
    this.getButtons = function() {
      let dataJSON = require('../lib/data/remote-data.js');
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

      $http.get(this.baseUrl + '/api/remote/' + btnCommand)
      //there's probably a better way to do this I'd like to see this be a single line
      .then((res) => {
        console.log('res.data: ' + res.data);
      }).catch((err) => {
        console.log('error: ' + err);
      });
    };

    this.getHistory = function() {
      // this doesn't really need to an if/else
      if ($window.localStorage.history !== undefined || $window.localStorage.history === '') {
        this.history = JSON.parse($window.localStorage.history);
      } else {
        this.history = '';
      }
    };

    this.hasHistory = function() {
      //just return !!(this.history) way cleaner
      if (this.history) return true;
      return false;
    };
    
  }]);
};
