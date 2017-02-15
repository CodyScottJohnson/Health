'use strict';

/**
 * @ngdoc service
 * @name Health.Socket
 * @description
 * # Socket
 * Service in the Health.
 */
angular.module('Health')
  .service('Socket', function($rootScope, $timeout, Functions) {
    var Socket = {
      data: {
        connections: []
      }
    };
    $rootScope.conn.onopen = function(e) {
      console.log("Connection established!");
      $rootScope.conn.send(angular.toJson({
        data:{id: 'User-' + $rootScope.rint,
        User_ID: $rootScope.currentUser.User_ID,
        Device: $rootScope.DeviceName || 'Web'},
        type: 'Health',
        'action': 'NewID'
      }));
    };
    var peer = new Peer('User-' + $rootScope.rint, {
      host: 'localhost',
      port: 9001,
      path: '/'
    });
    peer.on('connection', function(conn) {
      conn.on('data', function(data) {
        console.log('Recieved',data);
      });
    });
    $rootScope.conn.onmessage = function(event) {
      //console.log(event.data);
      var temp = angular.fromJson(event.data);
      if (temp.type === 'Health') {
        if (temp.action === 'NewID') {
          var newConnection = temp.data;
          Socket.data.connections.push(newConnection);
          $rootScope.$apply();
          console.log(Socket.data.connections)
        }
      }
    };
    Socket.Connect = function(ID){
      var index = _.findIndex(Socket.data.connections, {
        'id': ID
      });
      console.log(index);
      Socket.data.connections[index].conn = peer.connect(ID);
      Socket.data.connections[index].conn.on('open', function() {
          Socket.data.connections[index].Connected = true;
          $rootScope.$apply()

        console.log('open');
      });
      Socket.data.connections[index].conn.on('data', function(data) {
         console.log('Received', data);
      });
    }
    Socket.send = function(socket,data){
      socket.conn.send(data);
    }
    // Public API here
    return Socket;
  });
