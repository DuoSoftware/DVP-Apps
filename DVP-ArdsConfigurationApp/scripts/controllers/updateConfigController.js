/**
 * Created by Heshan.i on 1/29/2016.
 */
(function(){
  var app = angular.module('dvp-ardsConfigurationApp');
  var updateConfigController = function($scope, $routeParams, ardsService, resourceService, $mdDialog, $location){
    var accessToken = "1#1";
    var onGetOneReqMetaData = function(data){
      if(data.IsSuccess){
        $scope.metaData = JSON.parse(data.Result);
        resourceService.GetTasks(accessToken).then(onGetTasksComplete, function(){onError("fetch", "Tasks")});
        resourceService.GetGroups(accessToken).then(onGetGroupsComplete, function(){onError("fetch", "Groups")});
      }else{
        $scope.showAlert("Error", "OK", data.CustomMessage);
      }
    };
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
        for(var i=0; i<$scope.metaData.AttributeGroups.length; i++){
          var group = $scope.groups.inArray($scope.metaData.AttributeGroups[i]);
          if(group != null) {
            $scope.attributeGroups.push(group);
          }
        }
      }else{
        $scope.showAlert("Error", "OK", data.CustomMessage);
      }
    };
    var onEditReqMetaData = function(data){
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
    Array.prototype.inArray = function(comparer) {
      for(var i=0; i < this.length; i++) {
        if(comparer === (this[i].GroupId)) return this[i];
      }
      return null;
    };

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
    $scope.updateMetaData = function(){
      $scope.processing = true;
      $scope.metaData.AttributeGroups = [];
      for(var i=0; i< $scope.attributeGroups.length; i++){
        $scope.metaData.AttributeGroups.push($scope.attributeGroups[i].GroupId);
      }
      ardsService.editReqMetaData(accessToken, $scope.metaData).then(onEditReqMetaData, function(){onError("update", "Meta")});
    };
    $scope.backToMain = function(){
      $location.url("/ards/configuration");
    };
    $scope.loadData = function(){
      ardsService.getOneReqMetaData(accessToken,$routeParams.serverType, $routeParams.requestType).then(onGetOneReqMetaData, function(){onError("fetch", "Meta")});
    };
    $scope.loadData();
  };
  app.controller('updateConfigController', updateConfigController);
}());
