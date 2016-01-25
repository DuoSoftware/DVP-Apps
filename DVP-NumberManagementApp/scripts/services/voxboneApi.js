/**
 * Created by Heshan.i on 1/20/2016.
 */
(function(){
  var voxboneApi = function($http){
    //var accessToken = "Basic d2FydW5hOkR1b1MxMjM=";
    var uname = "waruna";
    var pword = "DuoS123";
    var accessToken = 'Basic ' + new Buffer(uname + ':' + pword).toString('base64');
    var GetCountryCodes = function(pageNumber, pageSize){
      return $http({
        method: 'GET',
        url: 'http://localhost:8832/DVP/API/1.0.0/voxbone/inventory/listcountries/'+pageNumber+'/'+pageSize,
        headers: {
          'api_key': accessToken,
          'authorization': accessToken
        }})
        .then(function(response){
          return response.data;
        });
    };
    var GetDidsForCountryCode = function(countryCode, pageNumber, pageSize){
      return $http({
        method: 'GET',
        url: 'http://localhost:8832/DVP/API/1.0.0/voxbone/inventory/listdidgroup/'+countryCode+'/'+pageNumber+'/'+pageSize,
        headers: {
          'authorization': accessToken
        }})
        .then(function(response){
          return response.data;
        });
    };
    var FilterDidsFormType = function(didType, countryCode, pageNumber, pageSize){
      return $http({
        method: 'GET',
        url: 'http://localhost:8832/DVP/API/1.0.0/voxbone/inventory/listdidgroup/type/'+didType+'/'+countryCode+'/'+pageNumber+'/'+pageSize,
        headers: {
          'authorization': accessToken
        }})
        .then(function(response){
          return response.data;
        });
    };
    var OrderDid = function(orderInfo){
      return $http({
        method: 'POST',
        url: 'http://localhost:8832/DVP/API/1.0.0/voxbone/order/OrderDids',
        headers: {
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
