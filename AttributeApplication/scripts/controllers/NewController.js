/**
 * Created by Pawan on 12/15/2015.
 */
(function () {
  var app= angular.module("attributeapp");

  var NewController = function ($scope,dbcontroller,$location,$mdDialog) {

    $scope.isDisabled = false;
    var onError = function(reason)
    {
      $scope.isDisabled = false;
      console.log("new saving error "+reason);
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
        $location.path("/attribute");
      }

    }

    $scope.AddNew = function (Attribute,Otherdata) {
      $scope.isDisabled = true;
      dbcontroller.NewAttribute(Attribute,Otherdata).then(onAttribAddingCompleted,onError);
    }


  }
  app.controller("NewController",NewController);
}());
