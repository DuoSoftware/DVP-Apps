/**
 * Created by Pawan on 1/19/2016.
 */
(function () {

  var app =   angular.module("clduserapp");

  var NewContextController = function ($scope,dbservice,commonservice,$location,$mdDialog,$mdMedia) {
    $scope.isDisabled = false;

    var onError = function (reason) {

      $scope.isDisabled = false;
      $scope.error = reason;
      commonservice.showAlert("Error", reason);
      console.log(reason);

    }

    var onContextAddingCompleted = function (response) {

      if (response.data.Exception) {
        onError(response.data.Exception.Message);
      }
      else {
        console.log("Saved data "+JSON.stringify(response.data.Result));
        $location.path("/contexts");
      }

    }

    $scope.AddNew = function () {

      $scope.isDisabled = true;

      $scope.newObj.AddUser="tempAddUser";
      $scope.newObj.UpdateUser="tempUpdateUser";

      console.log("New object "+JSON.stringify($scope.newObj));


      dbservice.newContext($scope.newObj).then(onContextAddingCompleted,onError);

    }

  }

  app.controller("NewContextController",NewContextController);
}());
