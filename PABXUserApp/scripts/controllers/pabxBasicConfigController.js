/**
 * Created by user-pc on 1/2/2016.
 */
(function() {
  var app = angular.module("pabxUserApp");

  var PABXBasicConfigController = function ($scope, dvpHandler, sharedResPABXUser, $location)
  {
      $scope.basicConfig = sharedResPABXUser.PABXUser;
      $scope.timeZoneList = timeZones;
  };

  app.controller("PABXBasicConfigController", PABXBasicConfigController);
}());
