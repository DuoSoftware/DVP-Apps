/**
 * Created by Heshan.i on 12/30/2015.
 */
(function(){
  var app = angular.module("extension_DID_DOD");
  var ExtensionController = function($scope,sipUser){
    var onGetExtensionComplete = function(data){
      if(data.IsSuccess){
        $scope.extensions = data.Result;
      }else{
        $scope.error = data.Exception;
      }
    };
    var onError = function(reason){
      $scope.error = "Could not fetch the extension data";
    };
    $scope.accessToken = 1;
    sipUser.getExtensions($scope.accessToken).then(onGetExtensionComplete,onError);
  };
  app.controller("ExtensionController",ExtensionController);
}());
