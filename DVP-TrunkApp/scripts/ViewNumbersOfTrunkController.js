/**
 * Created by Achintha on 2/1/2016.
 */
(function(){

  var app= angular.module("trunkApp");
  var ViewNumbersOfTrunkController = function($scope,$routeParams,backendcontroller,$location,$mdDialog,$mdMedia,commoncontroller) {

    var onLoadData = function(data)
    {
      $scope.NumbersByTrunkId = data.Result;
    }
    var onLoadError = function (data)
    {
      console.log("ViewNumbersOfTrunkController-Error--"+ data);
    }

    //$scope.editTrunkObj = backendcontroller.EditTrunkObj;
    //console.log("EditTrunkController--" +  $scope.editTrunkObj.data.Result);
    console.log("ViewNumbersOfTrunkController---p----" );

    $scope.TrunkIdOfNum = backendcontroller.editTrunkId;
    if($scope.TrunkIdOfNum)
    {
      console.log("ViewNumbersOfTrunkController--Hit");
     // backendcontroller.getTrunkDataById($routeParams.id).then(onLoadData,onLoadError);
      backendcontroller.getPhoneNumbersOfTrunk($scope.TrunkIdOfNum ).then(onLoadData,onLoadError);
      //console.log("Ex data   "+$scope.editTrunkObj.id );


    }
  };

  app.controller("ViewNumbersOfTrunkController",ViewNumbersOfTrunkController)
}())
