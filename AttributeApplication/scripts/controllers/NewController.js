/**
 * Created by Pawan on 12/15/2015.
 */
(function () {
  var app= angular.module("attributeapp");

  var NewController = function ($scope,dbcontroller,$location,$mdDialog,commoncontroller,$route) {

    $scope.isDisabled = false;
<<<<<<< HEAD

    var onError = function(reason)
    {
      $scope.isDisabled = false;
      console.log("new saving error "+reason);
      $mdDialog.hide();
      $route.reload();
    }

    $scope.HideDialog= function () {
      $mdDialog.hide();
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
        $mdDialog.hide();
        commoncontroller.showAlert("SUCCESS","Attribute Added successfully!");
        $route.reload();
=======

    var onError = function(reason)
    {
      $scope.isDisabled = false;
      console.log("new saving error "+reason);
      commoncontroller.showAlert("Error",reason);
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
>>>>>>> Development
      }

    }

<<<<<<< HEAD
    $scope.AddNew = function (Attribute,Otherdata) {
      $scope.isDisabled = true;
      dbcontroller.NewAttribute(Attribute,Otherdata).then(onAttribAddingCompleted,onError);
=======
    $scope.AddNew = function (obj) {
      $scope.isDisabled = true;
      console.log("Adding ............... "+JSON.stringify(obj));
      dbcontroller.NewAttribute(obj).then(onAttribAddingCompleted,onError);
>>>>>>> Development
    }


  }
  app.controller("NewController",NewController);
}());
