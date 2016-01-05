/**
 * Created by Pawan on 12/14/2015.
 */
(function () {
  var app= angular.module("attributeapp");
  var editObj;

  var EditController = function ($scope,dbcontroller,commoncontroller,$location,$mdDialog) {

    $scope.isDisabled = false;
    console.log("now "+dbcontroller.Attribobj.AttributeId);

    var onUpdateComplete = function(response)
    {
      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {
        $scope.isDisabled = false;
        $location.path("/attribute");
      }
    }

    var onError = function (reason)
    {
      $scope.isDisabled = false;
      $scope.error = reason;
      console.log(reason);
    }

    $scope.SaveUpdated = function(AttributeId)
    {
      $scope.isDisabled = true;

      $scope.editObj.AttributeId=AttributeId;
      console.log("Attribute ID : "+$scope.editObj.AttributeId);
      console.log("Edit Object "+JSON.stringify($scope.editObj));
      var title="Update attribute details ";
      var content= "Do you want to Save changes ? ";
      console.log(content) ;
      commoncontroller.showConfirm(title,"Save","Save","Cancel",content,function(obj){

        dbcontroller.updateAttribute($scope.editObj).then(onUpdateComplete,onError);


      }, function(){

        //$scope.showAlert("title","lable","ok","content");
        $scope.isDisabled = false;

      },editObj);



    }



    $scope.DataObj=dbcontroller.Attribobj;
  }
  app.controller("EditController",EditController);
}())
