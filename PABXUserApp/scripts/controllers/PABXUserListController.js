/**
 * Created by dinusha on 12/30/2015.
 */

(function() {
  var app = angular.module("pabxUserApp");

  var PABXUserListController = function ($scope, dvpHandler, sharedResPABXUser, $location)
  {
      $scope.query = {
        limit: 5,
        page: 1
      };

      $scope.dataReady = false;

      $scope.onEditPressed = function(usrObj)
      {
          sharedResPABXUser.PABXUser = usrObj;
          $location.url("/pabxUser/123");
      };

      var onGetPABXUserListSuccess = function(data)
      {
          $scope.pabxUsrList = data.Result;
          $scope.total = data.Result.length;
          $scope.dataReady = true;
      };

      var onGetPABXUserListError = function(err)
      {
          console.log('Error occurred : ' + err);
          $scope.serviceErr = "Could not load pabx users";
          $scope.dataReady = true;
      };


      dvpHandler.getPABXUsers().then(onGetPABXUserListSuccess, onGetPABXUserListError);

  };

  app.controller("PABXUserListController", PABXUserListController);
}());
