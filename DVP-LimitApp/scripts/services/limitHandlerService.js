/**
 * Created by Heshan.i on 1/18/2016.
 */
(function(){
  var limitHandler = function($http){
    var accessToken = "1#1";
    var GetAllLimits = function(){
      return $http({
        method: 'GET',
        url: 'http://limithandler.104.131.67.21.xip.io/DVP/API/1.0.0.0/LimitAPI/Limit/Info',
        headers: {
          'authorization': accessToken
        }})
        .then(function(response){
          return response.data;
        });
    };
    var AddNewLimit = function(limitInfo){
      return $http({
        method: 'POST',
        url: 'http://limithandler.104.131.67.21.xip.io/DVP/API/1.0.0.0/LimitAPI/Limit',
        headers: {
          'authorization': accessToken
        },
        data: limitInfo
      })
        .then(function(response){
          return response.data;
        });
    };
    var ChangeLimitStatus = function(limitId, status){
      return $http({
        method: 'PUT',
        url: 'http://limithandler.104.131.67.21.xip.io/DVP/API/1.0.0.0/LimitAPI/Limit/'+limitId+'/Activate/'+status,
        headers: {
          'authorization': accessToken
        }
      })
        .then(function(response){
          return response.data;
        });
    };
    var UpdateMaxLimit = function(limitId, maxLimit){
      return $http({
        method: 'PUT',
        url: 'http://limithandler.104.131.67.21.xip.io/DVP/API/1.0.0.0/LimitAPI/Limit/'+limitId+'/Max/'+maxLimit,
        headers: {
          'authorization': accessToken
        }
      })
        .then(function(response){
          return response.data;
        });
    };

    return{
      GetAllLimits: GetAllLimits,
      AddNewLimit: AddNewLimit,
      ChangeLimitStatus: ChangeLimitStatus,
      UpdateMaxLimit: UpdateMaxLimit
    };
  };
  var module = angular.module("dvp-limitApp");
  module.factory("limitHandler", limitHandler);
}());
