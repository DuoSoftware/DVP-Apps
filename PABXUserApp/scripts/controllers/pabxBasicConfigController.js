/**
 * Created by user-pc on 1/2/2016.
 */
(function() {
  var app = angular.module("pabxUserApp");

  var PABXBasicConfigController = function ($scope, dvpHandler, $location)
  {
      $scope.basicConfig = {
        UserName:"",
        AllowedNumbers:[]
      }

  };

  app.controller("PABXBasicConfigController", PABXBasicConfigController);
}());
