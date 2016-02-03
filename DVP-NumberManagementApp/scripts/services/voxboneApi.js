/**
 * Created by Heshan.i on 1/20/2016.
 */
(function(){
  var voxboneApi = function($http){
    //var accessToken = "Basic d2FydW5hOkR1b1MxMjM=";
    var GetCountryCodes = function(accessToken, pageNumber, pageSize){
      return $http({
        method: 'GET',
        url: 'http://voxboneapi.104.131.67.21.xip.io/DVP/API/1.0.0.0/voxbone/inventory/listcountries/'+pageNumber+'/'+pageSize,
        headers: {
          'api_key': accessToken,
          'authorization': accessToken
        }})
        .then(function(response){
          return response.data;
        });
    };
    var GetDidsForCountryCode = function(accessToken, countryCode, pageNumber, pageSize){
      return $http({
        method: 'GET',
        url: 'http://voxboneapi.104.131.67.21.xip.io/DVP/API/1.0.0.0/voxbone/inventory/listdidgroup/'+countryCode+'/'+pageNumber+'/'+pageSize,
        headers: {
          'api_key': accessToken,
          'authorization': accessToken
        }})
        .then(function(response){
          return response.data;
        });
    };
    var FilterDidsFormType = function(accessToken, didType, countryCode, pageNumber, pageSize){
      return $http({
        method: 'GET',
        url: 'http://voxboneapi.104.131.67.21.xip.io/DVP/API/1.0.0.0/voxbone/inventory/listdidgroup/type/'+didType+'/'+countryCode+'/'+pageNumber+'/'+pageSize,
        headers: {
          'api_key': accessToken,
          'authorization': accessToken
        }})
        .then(function(response){
          return response.data;
        });
    };
    var OrderDid = function(accessToken, orderInfo){
      return $http({
        method: 'POST',
        url: 'http://voxboneapi.104.131.67.21.xip.io/DVP/API/1.0.0.0/voxbone/order/OrderDids',
        headers: {
          'api_key': accessToken,
          'authorization': accessToken
        },
        data: orderInfo
      })
        .then(function(response){
          return response.data;
        });
    };

    return{
      GetCountryCodes: GetCountryCodes,
      GetDidsForCountryCode: GetDidsForCountryCode,
      FilterDidsFormType: FilterDidsFormType,
      OrderDid: OrderDid
    };
  };
  var module = angular.module("numberManagementApp");
  module.factory('voxboneApi', voxboneApi);
}());
