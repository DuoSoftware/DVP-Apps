/**
 * Created by Heshan.i on 12/29/2015.
 */
(function(){
  var sipUser = function($http){
    var didNumber= null;
    var extension= null;
    var authToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaW51c2hhZGNrIiwianRpIjoiMjViZjZmZTItZjZjNC00ZWJhLWFmODgtNmMxNjIxOTU4OGRiIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE4OTI0NDE2NzIsInRlbmFudCI6MSwiY29tcGFueSI6Mywic2NvcGUiOlt7InJlc291cmNlIjoiYWxsIiwiYWN0aW9ucyI6ImFsbCJ9XSwiaWF0IjoxNDYwNDM4MDcyfQ.aPoVPiTtoGFgnKmhdLBTzwTrQRTGWWliYujHP5NONqU';
    var getExtensions = function(accessToken){
      return $http.get("http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Extensions/OfCompany/"+authToken)
        .then(function(response){
          return response.data;
        });
    };
    var getDidNumbers = function(accessToken){
      return $http({
        method: 'GET',
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/DidNumbers',
        headers: {
          'authorization': authToken
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
            'authorization': authToken
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
          'authorization': authToken
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
          'authorization': authToken
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
          'authorization': authToken
        }
      })
        .then(function(response){
          return response.data;
        });
    };
    var getExtension = function(accessToken, extension){
      return $http({
        method: 'GET',
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Extension/'+extension,
        headers: {
          'authorization': authToken
        }})
        .then(function(response){
          return response.data;
        });
    };
    var addExtension = function(accessToken, extensionInfo){
      return $http({
        method: 'POST',
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Extension',
        headers: {
          'authorization': authToken
        },
        data:extensionInfo
      })
        .then(function(response){
          return response.data;
        });
    };
    var updateExtensionState = function(accessToken, extension, state){
      return $http({
        method: 'POST',
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Extension/'+extension+'/Status/'+state,
        headers: {
          'authorization': authToken
        }
      })
        .then(function(response){
          return response.data;
        });
    };
    var updateExtensionWithDod = function(accessToken, extId, dodNumber, isActive){
      var dodInfo = {ExtId:extId, DodNumber:dodNumber, DodActive:isActive};
      return $http({
        method: 'POST',
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/DodNumber',
        headers: {
          'authorization': authToken
        },
        data:dodInfo
      })
        .then(function(response){
          return response.data;
        });
    };
    var updateExtension = function(accessToken, extensionInfo){
      return $http({
        method: 'POST',
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Extension/'+extensionInfo.Extension,
        headers: {
          'authorization': authToken
        },
        data:extensionInfo
      })
        .then(function(response){
          return response.data;
        });
    };
    return{
      getExtensions:getExtensions,
      getDidNumbers:getDidNumbers,
      addDidNumber:addDidNumber,
      updateDidWithExtension:updateDidWithExtension,
      updateDidState:updateDidState,
      deleteDidNumber:deleteDidNumber,
      addExtension:addExtension,
      updateExtension:updateExtension,
      updateExtensionState:updateExtensionState,
      updateExtensionWithDod:updateExtensionWithDod,
      getExtension:getExtension,
      didNumber:didNumber,
      extension:extension
    };
  };
  var module = angular.module("extension_DID_DOD");
  module.factory("sipUser",sipUser);
}());
