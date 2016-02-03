/**
 * Created by Heshan.i on 1/29/2016.
 */
(function(){
  var app = angular.module('dvp-ardsConfigurationApp');
  var createConfigController = function($scope, ardsService, resourceService, $mdDialog, $location){
    var accessToken = "1#1";
    var onGetTasksComplete = function(data){
      if(data.IsSuccess){
        $scope.tasks = data.Result;
      }else{
        $scope.showAlert("Error", "OK", data.CustomMessage);
      }
    };
    var onGetGroupsComplete = function(data){
      if(data.IsSuccess){
        $scope.groups = data.Result;
        $scope.attributeGroups = [];
      }else{
        $scope.showAlert("Error", "OK", data.CustomMessage);
      }
    };
    var onAddReqMetaData = function(data){
      $scope.processing = false;
      if(data.IsSuccess){
        $scope.showAlert("Susscess", "OK", data.CustomMessage);
        $scope.backToMain();
      }else{
        $scope.showAlert("Error", "OK", data.CustomMessage);
      }
    };
    var onError = function(action, message){
      $scope.showAlert("Error", "OK", "Could not "+action+" the "+message+" data");
    };

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(group) {
        return (group.GroupName.toLowerCase().indexOf(lowercaseQuery) != -1);;
      };
    }

    $scope.metaData = {};
    $scope.querySearch = function(query) {
      var results = query ? $scope.groups.filter(createFilterFor(query)) : [];
      return results;
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
    $scope.saveMetaData = function(){
      $scope.processing = true;
      $scope.metaData.AttributeGroups = [];
      for(var i=0; i< $scope.attributeGroups.length; i++){
        $scope.metaData.AttributeGroups.push($scope.attributeGroups[i].GroupId);
      }
      ardsService.addReqMetaData(accessToken, $scope.metaData).then(onAddReqMetaData, function(){onError("add", "Meta")});
    };
    $scope.backToMain = function(){
      $location.url("/ards/configuration");
    };
    $scope.loadData = function(){
      resourceService.GetTasks(accessToken).then(onGetTasksComplete, function(){onError("fetch", "Tasks")});
      resourceService.GetGroups(accessToken).then(onGetGroupsComplete, function(){onError("fetch", "Groups")});
    };
    $scope.loadData();
  };
  app.controller('createConfigController', createConfigController);
}());
