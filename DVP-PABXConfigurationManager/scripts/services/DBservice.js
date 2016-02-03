/**
 * Created by Pawan on 1/14/2016.
 */
(function () {



  var dbservice = function ($http,$mdDialog,$mdMedia){

    //PABX methods

    var loadMasterData = function () {

      return $http.get("http://pbxservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PBXService/PbxMasterData")
        .then(function (response) {
          return response;
        });

    };
    var updateMasterData = function (masterObj) {

      return $http.post("http://pbxservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PBXService/PbxMasterData",masterObj)
        .then(function (response) {
          return response;
        });

    };
    var loadGeneral = function () {

      return $http({
        method: 'GET',
        url: 'http://pbxservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PBXService/FeatureCodes',
        headers: {
          'authorization': '1#1'
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
          'authorization': '1#1'
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
          'authorization': '1#1'
        }
      }).then(function(response)
      {
        return response;
      });
    }
    var addEmgNumber = function (numObj) {
      return $http({
        method: 'POST',
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/EmergencyNumber',
        headers: {
          'authorization': '1#1'
        },
        data: numObj
      }).then(function(response)
      {
        return response;
      });
    }
    var delEmgNumber = function (eNum) {
      return $http({
        method: 'DELETE',
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/EmergencyNumber/'+eNum,
        headers: {
          'authorization': '1#1'
        }
      }).then(function(response)
      {
        return response;
      });
    }

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
