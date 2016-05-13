/**
 * Created by Pawan on 12/18/2015.
 */
/**
 * Created by Pawan on 12/15/2015.
 */
(function () {
  var app= angular.module("attributeapp");

  var NewgroupController = function ($scope,dbcontroller,$location,$mdDialog,commoncontroller,$route) {

    $scope.isDisabled = false;

    var onError = function(reason)
    {
      $scope.isDisabled = false;
      $scope.error=reason;
      console.log(reason);
      if (reason.data)
      {
        commoncontroller.showAlert("Error",reason.data.message);
      }
      else
      {
        commoncontroller.showAlert("Error",reason);
      }


    }
    $scope.HideDialog= function () {
     $location.path("/group");

    }
    var onGroupAddingCompleted = function (response) {

      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {
        $scope.isDisabled = false;
        $scope.AddData = response.data.Result;
        commoncontroller.showAlert("SUCCESS","New Group added successfully !");
        $location.path("/group");

      }
    }

    $scope.AddNewGroup = function (grpObj) {
      $scope.isDisabled = true;
      dbcontroller.NewGroup(grpObj).then(onGroupAddingCompleted,onError);
    }



  }
  app.controller("NewgroupController",NewgroupController);
}());
