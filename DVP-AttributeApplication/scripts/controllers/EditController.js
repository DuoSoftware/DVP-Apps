/**
 * Created by Pawan on 12/14/2015.
 */
(function () {
  var app= angular.module("attributeapp");


  var EditController = function ($scope,dbcontroller,commoncontroller,$location,$mdDialog,$route) {
    $scope.editObj={};
    $scope.DataObj=dbcontroller.Attribobj;

    $scope.editObj.Attribute=$scope.DataObj.Attribute;
    $scope.editObj.OtherData=$scope.DataObj.OtherData;
    $scope.editObj.AttClass=$scope.DataObj.AttClass;
    $scope.editObj.AttType=$scope.DataObj.AttType;
    $scope.editObj.AttCategory=$scope.DataObj.AttCategory;





    $scope.isDisabled = false;
    console.log("now "+dbcontroller.Attribobj.AttributeId);

    var onUpdateComplete = function(response)
    {
      console.log("HIT");
      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {
        $scope.isDisabled = false;
        console.log("Updated......................");
        //$location.path("/attribute");
        //this.reload();
        $scope.isDisabled = true;
        $location.path("/attribute");
        //$route.reload();
      }
    }

    var onError = function (reason) {
      $scope.isDisabled = false;
      //$scope.error = reason;
      if (reason.data.message)
      {
        commoncontroller.showAlert("Error",reason.data.message);
      }
      else
      {
        commoncontroller.showAlert("Error",reason);
      }

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

      },$scope.editObj);



    }

    $scope.Erase = function () {
      console.log("Hit");
      //$mdDialog.hide();
      $location.path("/attribute");
    }


  }
  app.controller("EditController",EditController);
}())
