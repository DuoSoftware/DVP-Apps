/**
 * Created by Rajinda on 5/6/2016.
 */

'use strict';

var onlineStatusApp = angular.module('onlineStatusApp', []);

onlineStatusApp.factory('onlineStatus', ["$window", "$rootScope", function ($window, $rootScope) {
  var onlineStatus = {};

  onlineStatus.onLine = $window.navigator.onLine;

  onlineStatus.isOnline = function() {
    return onlineStatus.onLine;
  }

  $window.addEventListener("online", function () {
    onlineStatus.onLine = true;
    $rootScope.$digest();
  }, true);

  $window.addEventListener("offline", function () {
    onlineStatus.onLine = false;
    $rootScope.$digest();
  }, true);

  return onlineStatus;
}]);

onlineStatusApp.controller( 'OnlineStatusCtrl', function OnlineStatusCtrl( $scope, onlineStatus ) {
  $scope.onlineStatus = onlineStatus;

  $scope.$watch('onlineStatus.isOnline()', function(online) {
    $scope.online_status_string = online ? 'online' : 'offline';
    $scope.online_status = online;
  });
});
