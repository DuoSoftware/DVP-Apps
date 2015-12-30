/**
 * Created by Heshan.i on 12/29/2015.
 */
(function(){
  var sipUser = function($http){
    var getExtensions = function(accessToken){
      return $http.get("http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Extensions/OfCompany/"+accessToken)
        .then(function(response){
          return response.data;
        });
    };
    var getDidNumbers = function(accessToken){
      return $http({
        method: 'GET',
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/DidNumbers',
        headers: {
          'authorization': accessToken
        }})
        .then(function(response){
          return response.data;
        });
    };
    return{
      getExtensions:getExtensions,
      getDidNumbers:getDidNumbers
    };
  };
  var module = angular.module("extension_DID_DOD");
  module.factory("sipUser",sipUser);
}());
