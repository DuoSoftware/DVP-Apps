/**
 * Created by Pawan on 1/18/2016.
 */
(function () {
  var app =   angular.module("clduserapp");

  var NewUserController = function ($scope,dbservice,commonservice,$location,$mdDialog,$mdMedia) {

    $scope.isDisabled = true;
    $scope.newObj = {};
    $scope.selectedCluster;
    $scope.Clusters = {};

    var onClusterComplete = function (response) {

      if (response.data.Exception) {

        onError(response.data.Exception.Message);
      }
      else {
        console.log(JSON.stringify(response.data.Result));
        $scope.Clusters =response.data.Result;
        $scope.isDisabled = false;
      }


    }

    var onUserAddingCompleted = function (response) {

      if (response.data.Exception) {
        onError(response.data.Exception.Message);
      }
      else {
        console.log("Saved data "+JSON.stringify(response.data.Result));
        $location.path("new/endusers");
      }

    }

    var onError = function (reason) {

      $scope.isDisabled = false;
      $scope.error = reason;
      commonservice.showAlert("Error", reason);
      console.log(reason);

    }


    $scope.AddNew = function () {

      $scope.isDisabled = true;
      console.log("New object "+JSON.stringify($scope.newObj));

      dbservice.newUser($scope.newObj).then(onUserAddingCompleted,onError);

    }

    $scope.loadClusterData = function () {

      dbservice.loadClusterDetails().then(onClusterComplete, onError);


    }

    $scope.loadClusterData();

  }


  app.controller("NewUserController",NewUserController);
}());
