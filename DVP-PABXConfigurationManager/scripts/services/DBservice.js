/**
 * Created by Pawan on 1/14/2016.
 */
(function () {



  var dbservice = function ($http,$mdDialog,$mdMedia){

    //PABX methods

    var authToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaW51c2hhZGNrIiwianRpIjoiMjViZjZmZTItZjZjNC00ZWJhLWFmODgtNmMxNjIxOTU4OGRiIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE4OTI0NDE2NzIsInRlbmFudCI6MSwiY29tcGFueSI6Mywic2NvcGUiOlt7InJlc291cmNlIjoiYWxsIiwiYWN0aW9ucyI6ImFsbCJ9XSwiaWF0IjoxNDYwNDM4MDcyfQ.aPoVPiTtoGFgnKmhdLBTzwTrQRTGWWliYujHP5NONqU';

    var loadMasterData = function () {

      return $http({
        method: 'GET',
        url: "http://pbxservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PBXService/PbxMasterData",
        headers: {
          'authorization': authToken
        }
      }).then(function(response)
      {
        return response;
      });


    };
    var updateMasterData = function (masterObj) {

      return $http({
        method: 'POST',
        url: "http://pbxservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PBXService/PbxMasterData",
        headers: {
          'authorization': authToken
        },
        data:masterObj
      }).then(function(response)
      {
        return response;
      });


    };
    var loadGeneral = function () {

      return $http({
        method: 'GET',
        url: 'http://pbxservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PBXService/FeatureCodes',
        headers: {
          'authorization': authToken
        }
      }).then(function(response)
      {
        return response;
      });


    };
    var updateGeneralData = function (generalObj) {

      return $http({
        method: 'POST',
        url: 'http://pbxservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PBXService/FeatureCodeTemplate',
        headers: {
          'authorization': authToken
        },
        data:generalObj
      }).then(function(response)
      {
        return response;
      });

    };
    var loadEmergencyNumbers = function () {
      return $http({
        method: 'GET',
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/EmergencyNumbers',
        headers: {
          'authorization': authToken
        }
      }).then(function(response)
      {
        return response;
      });
    };
    var addEmgNumber = function (numObj) {
      return $http({
        method: 'POST',
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/EmergencyNumber',
        headers: {
          'authorization': authToken
        },
        data: numObj
      }).then(function(response)
      {
        return response;
      });
    };
    var delEmgNumber = function (eNum) {
      return $http({
        method: 'DELETE',
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/EmergencyNumber/'+eNum,
        headers: {
          'authorization': authToken
        }
      }).then(function(response)
      {
        return response;
      });
    };

    return{

      //pabx
      loadMasterData:loadMasterData,
      updateMasterData:updateMasterData,
      loadGeneral:loadGeneral,
      updateGeneralData:updateGeneralData,
      loadEmergencyNumbers:loadEmergencyNumbers,
      addEmgNumber:addEmgNumber,
      delEmgNumber:delEmgNumber


    };

  };


  var module = angular.module("pabxconfigapp");
  module.factory("dbservice",dbservice);
}());
