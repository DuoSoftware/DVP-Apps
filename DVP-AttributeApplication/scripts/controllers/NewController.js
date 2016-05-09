/**
 * Created by Pawan on 12/15/2015.
 */
(function () {
  var app= angular.module("attributeapp");

  var NewController = function ($scope,dbcontroller,$location,$mdDialog,commoncontroller,$route) {

    $scope.isDisabled = false;

    var onError = function(reason)
    {
      $scope.isDisabled = false;
      console.log("new saving error "+reason);
      if (reason.data.message)
      {
        commoncontroller.showAlert("Error",reason.data.message);
      }
      else
      {
        commoncontroller.showAlert("Error",reason);
      }
     // $location.path("/attribute");
    }

    $scope.HideDialog= function () {
      $location.path("/attribute");
    }

    var onAttribAddingCompleted = function (response) {


      if(response.data.Exception)
      {
        console.log(response.data.Exception.Message);
        onError(response.data.Exception.Message);
      }
      else
      {
        $scope.isDisabled = false;
        $scope.AddData= response.Result;

        commoncontroller.showAlert("SUCCESS","Attribute Added successfully!");
        $location.path("/attribute");
      }

    }

    $scope.AddNew = function (obj) {
      $scope.isDisabled = true;
      console.log("Adding ............... "+JSON.stringify(obj));
      dbcontroller.NewAttribute(obj).then(onAttribAddingCompleted,onError);
    }


  }
  app.controller("NewController",NewController);
}());
