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
     var peer = new Peer('User-'+$rootScope.rint, {host: 'localhost', port: 9001, path: '/'});


    $rootScope.conn.onmessage = function(event) {
      //console.log(event.data);
      var temp = angular.fromJson(event.data);
      if (temp.type === 'Health') {
        if(temp.action ==='NewID'){
          console.log(temp.id)
          $rootScope.conn = peer.connect(temp.id);
               $rootScope.conn.on('open', function(){
               $rootScope.conn.send('hi!');
               console.log(temp.id)
         });
        }
      }
    };
    peer.on('connection', function(conn) {
      console.log('connect');
      conn.on('data', function(data){
    console.log(data);
  });
});

    // Public API here
    return Socket;
  });
