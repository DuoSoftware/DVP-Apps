/**
 * Created by Achintha on 1/19/2016.
 */
(function(){
  var app = angular.module("trunkApp");
  var IndexController = function($scope,$location){
    $scope.selectedIndex = 0;

    $scope.$watch('selectedIndex', function(current) {
      switch (current) {
        case 0:
          $location.url("/trunk");
          break;
        case 1:
          $location.url("/phoneNumber");
          break;
      }});
  };
  app.controller("IndexController",IndexController);
}());
