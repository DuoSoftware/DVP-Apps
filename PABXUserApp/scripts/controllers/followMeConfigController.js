/**
 * Created by user-pc on 1/3/2016.
 */
(function() {
  var app = angular.module("pabxUserApp");

  var FollowMeConfigController = function($scope, dvpHandler, $location)
  {
    $scope.query = {
      limit: 5,
      page: 1
    };

    $scope.dataReady = false;


  };

  app.controller("FollowMeConfigController", FollowMeConfigController);
}());
