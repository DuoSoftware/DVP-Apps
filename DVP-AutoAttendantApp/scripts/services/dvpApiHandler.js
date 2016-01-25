/**
 * Created by dinusha on 1/14/2016.
 */
(function() {

  var dvpHandler = function($http)
  {
    var getAutoAttendants = function()
    {
      return $http({
        method: 'GET',
        url: 'http://localhost:4445/DVP/API/1.0/AuttoAttendants',
        headers: {
          'authorization': 'hhhh'
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
        url: 'http://localhost:4445/DVP/API/1.0/AuttoAttendant/' + autoAttName,
        headers: {
          'authorization': 'hhhh'
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
        url: 'http://localhost:4445/DVP/API/1.0/AuttoAttendant/' + autoAttName,
        headers: {
          'authorization': 'hhhh'
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
        url: 'http://localhost:4445/DVP/API/1.0/AuttoAttendant',
        headers: {
          'authorization': 'hhhh'
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
        url: 'http://localhost:4445/DVP/API/1.0/AuttoAttendant/' + obj.Name,
        headers: {
          'authorization': 'hhhh'
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
        url: 'http://localhost:4445/DVP/API/1.0/AuttoAttendant/' + autoAttName + '/Action/' + action.OnEvent,
        headers: {
          'authorization': 'hhhh'
        },
        data: action
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var getExtensions = function()
    {
      return $http({
        method: 'GET',
        url: 'http://localhost:8086/DVP/API/6.0/SipUser/Extensions/OfCompany/1',
        headers: {
          'authorization': 'hhhh'
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
          'authorization': 'hhhh'
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
      setAction: setAction
    };
  };



  var module = angular.module("autoAttendantApp");
  module.factory("dvpHandler", dvpHandler);

}());
