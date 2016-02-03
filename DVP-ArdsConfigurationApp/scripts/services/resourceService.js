/**
 * Created by Heshan.i on 1/29/2016.
 */
(function(){
  var resourceService = function($http){
    var GetTasks = function(accessToken){
      return $http({
        method: 'GET',
        url: 'http://localhost:8831/DVP/API/6.0/ResourceManager/Tasks',
        headers: {
          'authorization': accessToken,
          'api_key': accessToken
        }})
        .then(function(response){
          return response.data;
        });
    };
    var GetGroups = function(accessToken){
      return $http({
        method: 'GET',
        url: 'http://localhost:8831/DVP/API/6.0/ResourceManager/Groups',
        headers: {
          'authorization': accessToken,
          'api_key': accessToken
        }})
        .then(function(response){
          return response.data;
        });
    };

    return{
      GetTasks: GetTasks,
      GetGroups: GetGroups
    };
  };
  var module = angular.module('dvp-ardsConfigurationApp');
  module.factory('resourceService',resourceService);
}());
