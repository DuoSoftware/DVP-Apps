/**
 * Created by dinusha on 12/30/2015.
 */

(function() {
  var app = angular.module("pabxUserApp");

  var PABXUserListController = function ($scope, dvpHandler, $location)
  {
      $scope.query = {
        limit: 5,
        page: 1
      };

      var onGetPABXUserListSuccess = function(data)
      {
          $scope.pabxUsrList = data.Result;
          $scope.total = data.Result.length;
      };

      var onGetPABXUserListError = function(err)
      {
          console.log('Error occurred : ' + err);
          $scope.serviceErr = "Could not load pabx users";
      };


      dvpHandler.getPABXUsers().then(onGetPABXUserListSuccess, onGetPABXUserListError);

  };

  app.controller("PABXUserListController", PABXUserListController);
}());
