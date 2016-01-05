/**
 * Created by Pawan on 12/16/2015.
 */
/**
 * Created by Pawan on 12/14/2015.
 */
(function () {
  var app= angular.module("attributeapp");

  var EditgroupController = function ($scope,dbcontroller,commoncontroller,$location,$mdDialog) {

    var editObj;
    $scope.isDisabled = false;

    $scope.GDataObj=dbcontroller.GroupObj;

    var onUpdateComplete = function(response)
    {
      console.log(response.data.Exception);
      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {
        $scope.isDisabled = false;
        console.log(response);
        $location.path("/group");
      }
    }

    var onError = function (reason)
    {
      $scope.isDisabled = false;
      $scope.error = reason;
      console.log(reason);
    }

    $scope.SaveUpdated = function(gid)
    {
      $scope.isDisabled = true;
      $scope.editObj.GroupId=gid;
      var content= "Do you want to Save changes ? ";
      var title="Update group details ";
      console.log(content) ;
      commoncontroller.showConfirm(title,"Save","Save","Cancel",content,function(obj){

        dbcontroller.updateGroup($scope.editObj).then(onUpdateComplete,onError);


      }, function(){

        //$scope.showAlert("title","lable","ok","content");
        $scope.isDisabled = false;

      },editObj);





    }




  }
  app.controller("EditgroupController",EditgroupController
  );
}())
