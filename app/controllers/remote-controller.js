'use strict';

module.exports = function(app) {
  app.controller('RemoteController', ['$http', function($http) {
    console.log('remote controller');
    this.buttons = [
      {
        remoteId: 1,
        remoteName: 'VIZIO',
        name: 'KEY_POWER',
        command: 'SEND_ONCE'
      },
      {
        remoteId: 1,
        remoteName: 'VIZIO',
        name: 'VOL_DOWN',
        command: 'SEND_ONCE'
      },
      {
        remoteId: 1,
        remoteName: 'VIZIO',
        name: 'NUM_1',
        command: 'SEND_ONCE'
      },
    ];

    this.getButtons = function() {
      $http.get(this.baseUrl + '/api/remote')
      .then((res) => {
        let array = res.data;
        array.forEach((index) => {
          this.buttons.push(index);
        });
        console.log(this.buttons);
      })
      .catch((err) => {
        console.log('error getting buttons: ' + err.data);
      });
    };

    this.pressButton = function(remote, name, command) {
      console.log('remote: ' + remote);
      console.log('name: ' + name);
      console.log('command: ' + command);
      $http.post(this.baseUrl + '/api/remote')
      .then((res) => {
        console.log('res: ' + res);
      }).catch((err) => {
        console.log(err);
      });
    };
  }]);
};
