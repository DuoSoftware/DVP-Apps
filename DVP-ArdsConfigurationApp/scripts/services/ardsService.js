/**
 * Created by Heshan.i on 1/29/2016.
 */
(function(){
  var ardsService = function($http){
    var addReqMetaData = function(accessToken, metaData){
      return $http({
        method: 'POST',
        url: 'http://ardsliteservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ARDS/requestmeta',
        headers: {
          'authorization': accessToken
        },
        data: metaData
      })
        .then(function(response){
          return response.data;
        });
    };
    var editReqMetaData = function(accessToken, metaData){
      return $http({
        method: 'PUT',
        url: 'http://ardsliteservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ARDS/requestmeta',
        headers: {
          'authorization': accessToken
        },
        data: metaData
      })
        .then(function(response){
          return response.data;
        });
    };
    var getReqMetaData = function(accessToken){
      return $http({
        method: 'GET',
        url: 'http://ardsliteservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ARDS/requestmeta',
        headers: {
          'authorization': accessToken
        }})
        .then(function(response){
          return response.data;
        });
    };
    var getOneReqMetaData = function(accessToken, serverType, requestType){
      return $http({
        method: 'GET',
        url: 'http://ardsliteservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ARDS/requestmeta/'+serverType+'/'+requestType,
        headers: {
          'authorization': accessToken
        }})
        .then(function(response){
          return response.data;
        });
    };
    var deleteReqMetaData = function(accessToken, serverType, requestType){
      return $http({
        method: 'DELETE',
        url: 'http://ardsliteservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ARDS/requestmeta/'+serverType+'/'+requestType,
        headers: {
          'authorization': accessToken
        }})
        .then(function(response){
          return response.data;
        });
    };

    return{
      addReqMetaData: addReqMetaData,
      editReqMetaData: editReqMetaData,
      getReqMetaData: getReqMetaData,
      getOneReqMetaData: getOneReqMetaData,
      deleteReqMetaData: deleteReqMetaData
    };
  };
  var module = angular.module('dvp-ardsConfigurationApp');
  module.factory('ardsService', ardsService);
}());
