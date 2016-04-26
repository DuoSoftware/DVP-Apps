/**
 * Created by dinusha on 1/14/2016.
 */
(function() {

  var dvpHandler = function($http)
  {
    var authToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaW51c2hhZGNrIiwianRpIjoiMjViZjZmZTItZjZjNC00ZWJhLWFmODgtNmMxNjIxOTU4OGRiIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE4OTI0NDE2NzIsInRlbmFudCI6MSwiY29tcGFueSI6Mywic2NvcGUiOlt7InJlc291cmNlIjoiYWxsIiwiYWN0aW9ucyI6ImFsbCJ9XSwiaWF0IjoxNDYwNDM4MDcyfQ.aPoVPiTtoGFgnKmhdLBTzwTrQRTGWWliYujHP5NONqU';
    var getAutoAttendants = function()
    {
      return $http({
        method: 'GET',
        url: 'http://autoattendant.104.131.67.21.xip.io/DVP/API/1.0.0.0/AutoAttendants',
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var getAutoAttendant = function(autoAttName)
    {
      return $http({
        method: 'GET',
        url: 'http://autoattendant.104.131.67.21.xip.io/DVP/API/1.0.0.0/AutoAttendant/' + autoAttName,
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var deleteAutoAttendant = function(autoAttName)
    {
      return $http({
        method: 'DELETE',
        url: 'http://autoattendant.104.131.67.21.xip.io/DVP/API/1.0.0.0/AutoAttendant/' + autoAttName,
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var saveAutoAttendants = function(obj)
    {
      return $http({
        method: 'POST',
        url: 'http://autoattendant.104.131.67.21.xip.io/DVP/API/1.0.0.0/AutoAttendant',
        headers: {
          'authorization': authToken
        },
        data: obj
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var updateAutoAttendants = function(obj)
    {
      return $http({
        method: 'PUT',
        url: 'http://autoattendant.104.131.67.21.xip.io/DVP/API/1.0.0.0/AutoAttendant/' + obj.Name,
        headers: {
          'authorization': authToken
        },
        data: obj
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var setAction = function(autoAttName, action)
    {
      return $http({
        method: 'POST',
        url: 'http://autoattendant.104.131.67.21.xip.io/DVP/API/1.0.0.0/AutoAttendant/' + autoAttName + '/Action/' + action.OnEvent,
        headers: {
          'authorization': authToken
        },
        data: action
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var deleteAction = function(autoAttName, actionId)
    {
      return $http({
        method: 'DELETE',
        url: 'http://autoattendant.104.131.67.21.xip.io/DVP/API/1.0.0.0/AutoAttendant/' + autoAttName + '/Action/' + actionId,
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var getExtensions = function()
    {
      return $http({
        method: 'GET',
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Extensions/OfCompany/1',
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var getGreetingFileMetadata = function(refId)
    {
      return $http({
        method: 'GET',
        url: 'http://fileservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/FileService/Files/' + refId + '/CALL/AUTOATTENDANT/GREETING',
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    return {
      getAutoAttendants: getAutoAttendants,
      getExtensions: getExtensions,
      getGreetingFileMetadata: getGreetingFileMetadata,
      saveAutoAttendants: saveAutoAttendants,
      updateAutoAttendants: updateAutoAttendants,
      getAutoAttendant: getAutoAttendant,
      deleteAutoAttendant: deleteAutoAttendant,
      setAction: setAction,
      deleteAction: deleteAction
    };
  };



  var module = angular.module("autoAttendantApp");
  module.factory("dvpHandler", dvpHandler);

}());
