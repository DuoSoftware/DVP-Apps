/**
 * Created by Heshan.i on 1/5/2016.
 */
(function(){
  var app = angular.module("extension_DID_DOD");
  var IndexController = function($scope,$location){
    $scope.selectedIndex = 0;

    $scope.$watch('selectedIndex', function(current) {
      switch (current) {
        case 0:
          $location.url("/extension");
          break;
        case 1:
          $location.url("/did");
          break;
      }});
  };
  app.controller("IndexController",IndexController);
  }());
