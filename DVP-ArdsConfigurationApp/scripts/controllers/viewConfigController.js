/**
 * Created by Heshan.i on 1/29/2016.
 */
(function(){
  var app = angular.module('dvp-ardsConfigurationApp');
  var viewConfigController = function($scope, ardsService, $location, $mdDialog){
    var accessToken = "1#1";
    var onGetReqMetaDataComplete = function(data){
      if(data.IsSuccess){
        $scope.reqMetaData = data.Result;
        $scope.total = $scope.reqMetaData.length;
      }else{
        $scope.showAlert("Error", "OK", data.CustomMessage);
      }
    };
    var onDeleteReqMetaData = function(data){
      if(data.IsSuccess){
        $scope.showAlert("Success", "OK", "Delete ARDS configuration success");
        $scope.loadData();
      }else{
        $scope.showAlert("Error", "OK", data.CustomMessage);
      }
    };
    var onError = function(){
      $scope.showAlert("Error", "OK", "Could not fetch the configuration data");
    };

    $scope.query = {
      limit: 5,
      page: 1
    };
    $scope.showAlert = function(tittle, button, content) {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title(tittle)
          .textContent(content)
          .ok(button)
      );
    };
    $scope.deleteMetaData = function(ev, serverType, requestType) {
      var confirm = $mdDialog.confirm()
        .title('Delete Configuration')
        .textContent('Would you like to delete ARDS configuration?')
        .ariaLabel('')
        .targetEvent(ev)
        .ok('Delete')
        .cancel('Cancel');
      $mdDialog.show(confirm).then(function() {
        ardsService.deleteReqMetaData(accessToken,serverType,requestType).then(onDeleteReqMetaData, onError);
      }, function() {
      });
    };
    $scope.addMetaData = function(){
      $location.url("/ards/configuration/add");
    };
    $scope.editMetaData = function(serverType, requestType){
      $location.url("/ards/configuration/edit/"+serverType+"/"+requestType);
    };
    $scope.loadData = function(){
      ardsService.getReqMetaData(accessToken).then(onGetReqMetaDataComplete, onError);
    };
    $scope.loadData();
  };
  app.controller("viewConfigController", viewConfigController);
}());
