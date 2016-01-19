/**
 * Created by dinusha on 1/14/2016.
 */
(function() {
  var app = angular.module("userManagementApp");

  var GroupConfigurationController = function ($scope, $location, $mdDialog, $mdToast)
  {
    $scope.endUserList = [{id:9, Domain:"192.168.1.12"}];

  };

  app.controller("GroupConfigurationController", GroupConfigurationController);
}());
