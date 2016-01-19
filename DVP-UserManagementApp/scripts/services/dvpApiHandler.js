/**
 * Created by dinusha on 1/14/2016.
 */
(function() {

  var dvpHandler = function($http)
  {
    var getSIPUsers = function()
    {
      return $http({
        method: 'GET',
        url: 'http://192.168.0.88:8086/DVP/API/6.0/SipUser/Users',
        headers: {
          'authorization': 'hhhh'
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var getSIPUser = function(username)
    {
      return $http({
        method: 'GET',
        url: 'http://192.168.0.88:8086/DVP/API/6.0/SipUser/User/' + username,
        headers: {
          'authorization': 'hhhh'
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var saveSIPUser = function(usrObj)
    {
      return $http({
        method: 'POST',
        url: 'http://192.168.0.88:8086/DVP/API/6.0/SipUser/User',
        headers: {
          'authorization': 'hhhh'
        },
        data:usrObj
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var getContexts = function()
    {
      return $http({
        method: 'GET',
        url: 'http://192.168.0.88:8086/DVP/API/6.0/SipUser/Context/ByCompany/1',
        headers: {
          'authorization': 'hhhh'
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var assignExtensionToUser = function(ext, sipUserId)
    {
      return $http({
        method: 'POST',
        url: 'http://192.168.0.88:8086/DVP/API/6.0/SipUser/Extension/' + ext + '/AssignToSipUser/' + sipUserId,
        headers: {
          'authorization': 'hhhh'
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var addNewExtension = function(extObj)
    {
      return $http({
        method: 'POST',
        url: 'http://192.168.0.88:8086/DVP/API/6.0/SipUser/Extension',
        headers: {
          'authorization': 'hhhh'
        },
        data:extObj
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var getSchedules = function()
    {
      return $http({
        method: 'GET',
        url: 'http://limithandler.104.131.67.21.xip.io/DVP/API/1.0.0.0/LimitAPI/Schedules/byCompany',
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
        url: 'http://fileservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/FileService/Files/' + refId + '/PABX/USER/GREETING',
        headers: {
          'authorization': 'hhhh'
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    return {
      getGreetingFileMetadata: getGreetingFileMetadata,
      getSIPUsers: getSIPUsers,
      getSchedules: getSchedules,
      getContexts: getContexts,
      getSIPUser: getSIPUser,
      saveSIPUser: saveSIPUser,
      addNewExtension: addNewExtension,
      assignExtensionToUser: assignExtensionToUser
    };
  };

  var module = angular.module("userManagementApp");
  module.factory("dvpHandler", dvpHandler);

}());
