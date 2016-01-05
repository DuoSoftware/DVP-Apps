/**
 * Created by Pawan on 12/18/2015.
 */
/**
 * Created by Pawan on 12/15/2015.
 */
(function () {
  var app= angular.module("attributeapp");

  var NewgroupController = function ($scope,dbcontroller,$location,$mdDialog) {

    $scope.isDisabled = false;

    var onError = function(reason)
    {
      $scope.isDisabled = false;
      $scope.error=reason;
      console.log(reason);
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
        $location.path("/group");
      }
    }

    $scope.AddNewGroup = function (GroupName,OtherData,Percentage) {
      $scope.isDisabled = true;
      dbcontroller.NewGroup(GroupName,OtherData,Percentage).then(onGroupAddingCompleted,onError);
    }


  }
  app.controller("NewgroupController",NewgroupController);
}());
