/**
 * Created by Heshan.i on 1/29/2016.
 */
(function(){
  var resourceService = function($http){
    var authToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaW51c2hhZGNrIiwianRpIjoiMjViZjZmZTItZjZjNC00ZWJhLWFmODgtNmMxNjIxOTU4OGRiIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE4OTI0NDE2NzIsInRlbmFudCI6MSwiY29tcGFueSI6Mywic2NvcGUiOlt7InJlc291cmNlIjoiYWxsIiwiYWN0aW9ucyI6ImFsbCJ9XSwiaWF0IjoxNDYwNDM4MDcyfQ.aPoVPiTtoGFgnKmhdLBTzwTrQRTGWWliYujHP5NONqU';
    var GetTasks = function(accessToken){
      return $http({
        method: 'GET',
        url: 'http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Tasks',
        headers: {
          'authorization': authToken,
          'api_key': accessToken
        }})
        .then(function(response){
          return response.data;
        });
    };
    var GetGroups = function(accessToken){
      return $http({
        method: 'GET',
        url: 'http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Groups',
        headers: {
          'authorization': authToken,
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
