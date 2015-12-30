/**
 * Created by Heshan.i on 12/30/2015.
 */
(function(){
  var app = angular.module("extension_DID_DOD");
  var DidController = function($scope,sipUser){
    var onDidNumbersComplete = function(data){
      if(data.IsSuccess){
        $scope.didNumbers = data.Result;
      }else{
        $scope.error = data.Exception;
      }
    };
    var onError = function(reason){
      $scope.error = "Could not fetch the did_number data";
    };
    $scope.accessToken = "1#1";
    sipUser.getDidNumbers($scope.accessToken).then(onDidNumbersComplete,onError);
  };
  app.controller("DidController",DidController);
}());
