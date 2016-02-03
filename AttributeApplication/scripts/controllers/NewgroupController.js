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
<<<<<<< HEAD
      $mdDialog.hide();
      console.log(reason);
      commoncontroller.showAlert("ERROR",reason);
      $route.reload();

    }
    $scope.HideDialog= function () {
      $mdDialog.hide();

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
        $mdDialog.hide();
=======
      console.log(reason);
      commoncontroller.showAlert("ERROR",reason);


    }
    $scope.HideDialog= function () {
     $location.path("/group");
>>>>>>> Development

        $route.reload();

      }
    }
<<<<<<< HEAD

    $scope.AddNewGroup = function (GroupName,OtherData,Percentage) {
      $scope.isDisabled = true;
      dbcontroller.NewGroup(GroupName,OtherData,Percentage).then(onGroupAddingCompleted,onError);
=======
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
>>>>>>> Development
    }



  }
  app.controller("NewgroupController",NewgroupController);
}());
