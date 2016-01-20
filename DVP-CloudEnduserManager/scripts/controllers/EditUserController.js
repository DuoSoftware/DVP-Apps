/**
 * Created by Pawan on 1/14/2016.
 */
(function () {

  var app =   angular.module("clduserapp");

  var EditUserController = function ($scope,dbservice,commonservice,$location,$mdDialog,$mdMedia,$routeParams) {

    $scope.isDisabled = false;
    console.log("ID "+JSON.stringify($routeParams.id));
    $scope.editObj={};
    //$scope.DataObj=dbservice.Userobj;
    //$scope.editObj=dbservice.Userobj;
    /* console.log("Service  "+JSON.stringify(dbservice.Userobj));
     console.log("LOcal  "+JSON.stringify($scope.DataObj));
     $scope.editObj=dbservice.Userobj;
     console.log("Edit  "+JSON.stringify($scope.editObj));
     alert("yooooo");
     $scope.editObj.Domain=$scope.DataObj.Domain;
     $scope.editObj.SIPConnectivityProvision=$scope.DataObj.SIPConnectivityProvision;
     $scope.editObj.ClusterId=$scope.DataObj.ClusterId;
     $scope.editObj.NetworkId=$scope.DataObj.NetworkId;
     $scope.editObj.ClusterId=$scope.DataObj.ClusterId;
     $scope.editObj.SipNetworkProfileId=$scope.DataObj.SipNetworkProfileId;

     console.log("ERRRJJJJ  "+JSON.stringify($scope.editObj));*/

    var onClusterComplete = function (response) {

      if (response.data.Exception) {

        onError(response.data.Exception.Message);
      }
      else {
        console.log(JSON.stringify(response.data.Result));
        $scope.Clusters =response.data.Result;
        // $scope.isDisabled = false;
        $scope.loadEditUser(parseInt($routeParams.id));
      }


    }

    $scope.hideView= function () {
      $location.path("/contexts");
    }

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
        $location.path("/endusers");
        //$route.reload();
      }
    }

    var onLoadComplete = function (response) {
      console.log("Hitaaaa");

      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {
        // console.log("ONLOAD   "+JSON.stringify(response));
        $scope.isDisabled = false;
        $scope.editObj =response.data.Result;
        // $location.path("/endusers");
        //$route.reload();
      }

    }

    var onError = function (reason)
    {
      $scope.isDisabled = false;
      $scope.error = reason;
      commonservice.showAlert("Error",reason);
      console.log(reason);
    }

    $scope.SaveUpdated = function(userID)
    {
      $scope.isDisabled = true;


      var title="Update Cloud User details ";
      var content= "Do you want to Save changes ? ";
      console.log(content) ;
      commonservice.showConfirm(title,"Save","Save","Cancel",content,function(obj){

        dbservice.updateUser($scope.editObj).then(onUpdateComplete,onError);


      }, function(){

        //$scope.showAlert("title","lable","ok","content");
        $scope.isDisabled = false;

      },$scope.editObj);



    }

    $scope.Erase = function () {
      console.log("Hit");
      //$mdDialog.hide();
      $location.path("/endusers");
    }

    $scope.loadEditUser = function(uID)
    {
      console.log("Hityty");
      dbservice.getUser(uID).then(onLoadComplete,onError);
    }

    $scope.loadClusterData = function () {

      dbservice.loadClusterDetails().then(onClusterComplete, onError);


    }

    $scope.loadClusterData();


  }
  app.controller("EditUserController",EditUserController);
}());
