/**
 * Created by Achintha on 1/18/2016.
 */

(function () {

  var app = angular.module("holdMusicApp");
  var DeleteMusicProfileController = function($scope,backendcontroller,$location,$mdDialog,$mdMedia,commoncontroller){

   // $scope.DeleteMusicProfile = function()
   // {
    $scope.Name = backendcontroller.DeleteProfilename;
      console.log("dadsdasdsadsadasdsadasdasdas---"+$scope.Name);

      commoncontroller.showConfirm("Delete Profile", "Do You Wnt to Delete this Profile  ","YES", "NO", "Do You Wnt to Delete this Profile.... ", function (okobj) {
        backendcontroller.deleteMusicProfile($scope.Name).then(onDeletenComplete,onError);
        //$scope.musicData={};
        // commoncontroller.showAlert("Delete..","Profile Deleted Sucessfully..");
        console.log("DeleteProfile");
        //$location.path("/app");
      }, function () {
        $location.path("/app");

      }, "okObj");

 //   }

    var onDeletenComplete = function(deactiveData){
      console.log("wwwwwwwCCCCC");
      console.log(deactiveData);
      $scope.deactiveAppData=deactiveData.Result;
      console.log($scope.deactiveAppData);
      $location.path("/app");
      //return $scope.DataObj;
    }
    var onError = function(reson){
      console.log(reson);
      $location.path("/app");
    }

   // $location.path("/main");


  };
  app.controller("DeleteMusicProfileController",DeleteMusicProfileController)
}())
