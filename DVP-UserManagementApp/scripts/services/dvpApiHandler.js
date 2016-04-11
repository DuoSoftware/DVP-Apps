/**
 * Created by dinusha on 1/14/2016.
 */
(function() {

  var dvpHandler = function($http)
  {
    var authToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaW51c2hhZGNrIiwianRpIjoiZTBhMGFlYzItMDViYi00YTZiLThlYjctMzFmZjBjYWE4OGI0Iiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE4OTIzNTM2NDksInRlbmFudCI6MSwiY29tcGFueSI6Mywic2NvcGUiOlt7InJlc291cmNlIjoiYWxsIiwiYWN0aW9ucyI6ImFsbCJ9XSwiaWF0IjoxNDYwMzUwMDQ5fQ.CJuBzazkYKiGWVhxvZ4NweilYP3n5RQFvTk2VoHYa2c';
    var getSIPUsers = function()
    {
      return $http({
        method: 'GET',
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Users',
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var getGroups = function()
    {
      return $http({
        method: 'GET',
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Groups/Company/1',
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var getGroup = function(id)
    {
      return $http({
        method: 'GET',
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Group/' + id,
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var getUsersForGroup = function(id)
    {
      return $http({
        method: 'GET',
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Users/InGroup/' + id,
        headers: {
          'authorization': authToken
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
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/User/' + username,
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var getExtension = function(extId)
    {
      return $http({
        method: 'GET',
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Extension/' + extId,
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };


    var addUserToGroup = function(usrId, grpId)
    {
      return $http({
        method: 'POST',
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/' + usrId + '/AssignToGroup/' + grpId,
        headers: {
          'authorization': authToken
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
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/User',
        headers: {
          'authorization': authToken
        },
        data:usrObj
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var setPublicUser = function(usrObj)
    {
      return $http({
        method: 'POST',
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/DuoWorldUser',
        headers: {
          'authorization': authToken
        },
        data:usrObj
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var saveTransferCodes = function(transCodes)
    {
      return $http({
        method: 'POST',
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/TransferCodes',
        headers: {
          'authorization': authToken
        },
        data:transCodes
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var updateTransferCodes = function(transCodes)
    {
      return $http({
        method: 'PUT',
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/TransferCode/' + transCodes.id,
        headers: {
          'authorization': authToken
        },
        data:transCodes
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var getTransferCodes = function()
    {
      return $http({
        method: 'GET',
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/TransferCode',
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var saveGroup = function(grpObj)
    {
      return $http({
        method: 'POST',
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Group',
        headers: {
          'authorization': authToken
        },
        data:grpObj
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var updateGroup = function(grpObj)
    {
      return $http({
        method: 'POST',
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Group/' + grpObj.id,
        headers: {
          'authorization': authToken
        },
        data:grpObj
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var getContexts = function()
    {
      return $http({
        method: 'GET',
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Context/ByCompany/1',
        headers: {
          'authorization': authToken
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
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Extension/' + ext + '/AssignToSipUser/' + sipUserId,
        headers: {
          'authorization': authToken
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
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Extension',
        headers: {
          'authorization': authToken
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
        url: 'http://fileservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/FileService/Files/' + refId + '/PABX/USER/GREETING',
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var updateUser = function(usrObj)
    {

      return $http({
        method: 'PUT',
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/User/' + usrObj.SipUsername,
        headers: {
          'authorization': authToken
        },
        data: usrObj
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
      assignExtensionToUser: assignExtensionToUser,
      getGroups: getGroups,
      getGroup: getGroup,
      getUsersForGroup: getUsersForGroup,
      addUserToGroup: addUserToGroup,
      saveGroup: saveGroup,
      updateGroup: updateGroup,
      getExtension: getExtension,
      saveTransferCodes: saveTransferCodes,
      updateTransferCodes: updateTransferCodes,
      getTransferCodes: getTransferCodes,
      setPublicUser: setPublicUser,
      updateUser: updateUser
    };
  };

  var module = angular.module("userManagementApp");
  module.factory("dvpHandler", dvpHandler);

}());
