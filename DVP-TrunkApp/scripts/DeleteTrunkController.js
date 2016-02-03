/**
 * Created by Achintha on 1/26/2016.
 */
(function () {

  var app = angular.module("trunkApp");
  var DeleteTrunkController = function($scope,backendcontroller,$location,$mdDialog,$mdMedia,commoncontroller){

    // $scope.DeleteTrunk = function()
    // {
    $scope.trunkId = backendcontroller.editTrunkObj.id;

    console.log("dadsdasdsadsadasdsadasdasdas---"+$scope.trunkId);

    commoncontroller.showConfirm("Delete Trunk", "Do You Wnt to Delete this Trunk  ","YES", "NO", "Do You Wnt to Delete this Trunk.... ", function (okobj) {
      backendcontroller.deleteTrunk($scope.Name).then(onDeleteComplete,onError);
      //$scope.musicData={};
      // commoncontroller.showAlert("Delete..","Profile Deleted Sucessfully..");
      console.log("DeleteProfile");
      //$location.path("/app");
    }, function () {
      $location.path("/main");

    }, "okObj");

    //   }

    var onDeleteComplete = function(deactiveData){
      console.log("wwwwwwwCCCCC");
      console.log(deactiveData);
      $scope.deactiveAppData=deactiveData.Result;
      console.log($scope.deactiveAppData);
      $location.path("/main");
      //return $scope.DataObj;
    }
    var onError = function(reson){
      console.log(reson);
      $location.path("/main");
    }

    // $location.path("/main");


  };
  app.controller("DeleteTrunkController",DeleteTrunkController)
}())
