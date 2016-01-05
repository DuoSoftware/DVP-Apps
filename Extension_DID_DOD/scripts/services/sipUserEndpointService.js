/**
 * Created by Heshan.i on 12/29/2015.
 */
(function(){
  var sipUser = function($http){
    var didNumber= null;
    var extension= null;
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
    var addDidNumber = function(accessToken, didInfo){
        return $http({
          method: 'POST',
          url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/DidNumber',
          headers: {
            'authorization': accessToken
          },
          data:didInfo
        })
          .then(function(response){
            return response.data;
          });
    };
    var updateDidWithExtension = function(accessToken, didNumber, extension){
      return $http({
        method: 'POST',
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/DidNumber/'+didNumber+'/AssignToExt/'+extension,
        headers: {
          'authorization': accessToken
        }
      })
        .then(function(response){
          return response.data;
        });
    };
    var updateDidState = function(accessToken, didNumber, state){
      return $http({
        method: 'POST',
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/DidNumber/'+didNumber+'/Activate/'+state,
        headers: {
          'authorization': accessToken
        }
      })
        .then(function(response){
          return response.data;
        });
    };
    var deleteDidNumber = function(accessToken,id){
      return $http({
        method: 'DELETE',
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/DidNumber/'+id,
        headers: {
          'authorization': accessToken
        }
      })
        .then(function(response){
          return response.data;
        });
    }
    return{
      getExtensions:getExtensions,
      getDidNumbers:getDidNumbers,
      addDidNumber:addDidNumber,
      updateDidWithExtension:updateDidWithExtension,
      updateDidState:updateDidState,
      deleteDidNumber:deleteDidNumber,
      didNumber:didNumber,
      extension:extension
    };
  };
  var module = angular.module("extension_DID_DOD");
  module.factory("sipUser",sipUser);
}());
