/**
 * Created by Heshan.i on 1/18/2016.
 */
(function(){
  var app = angular.module("dvp-limitApp");
  var limitController = function($scope, limitHandler){
    $scope.accessToekn = "1#1";
    $scope.query = {
      limit: 5,
      page: 1
    };

    var onGetAllLimitsComplete = function(data){
      if(data.IsSuccess){
        $scope.limitDetails = data.Result;
        $scope.total = $scope.limitDetails.length;
      }else{
        $scope.error = data.Exception;
      }
    };
    var onError = function(reason){
      $scope.error = reason;
    };

    $scope.loadData = function(){
      limitHandler.GetAllLimits($scope.accessToken).then(onGetAllLimitsComplete, function(){onError("Could not fetch the Limit data")});
    };
    $scope.loadData();
  };
  app.controller("limitController", limitController);
}());
