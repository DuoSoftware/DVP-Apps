/**
 * Created by dinusha on 12/30/2015.
 */
(function() {

  var dvpHandler = function($http)
  {
    var authToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaW51c2hhZGNrIiwianRpIjoiMTNiMzA3M2EtNDgwMi00NjNhLTllMWYtMDRlZTdkNGMzMmEyIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE4OTE5MjE4MDgsInRlbmFudCI6MSwiY29tcGFueSI6Mywic2NvcGUiOlt7InJlc291cmNlIjoiYWxsIn0seyJyZXNvdXJjZSI6InBieGFkbWluIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InBieHVzZXIiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfV0sImlhdCI6MTQ1OTkxODIwOH0.EJgilGayGMYFJQ3XXTzgaYT9RSWgUHCYbCDzOSICY5I';

    var getPABXUsers = function()
    {

      return $http({
        method: 'GET',
        url: 'http://localhost:8820/DVP/API/1.0.0.0/PBXService/PBXUsers',
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

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



    var getPABXUserTemplates = function(userUuid)
    {
      return $http({
        method: 'GET',
        url: 'http://localhost:8820/DVP/API/1.0.0.0/PBXService/PBXUser/' + userUuid + '/PBXUserTemplates',
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var postPABXUserTemplate = function(userUuid, destNum, destType)
    {
      return $http({
        method: 'POST',
        url: 'http://localhost:8820/DVP/API/1.0.0.0/PBXService/PBXUser/' + userUuid + '/PBXUserTemplate',
        headers: {
          'authorization': authToken
        },
        data:{CallDivertNumber:destNum, ObjCategory: destType}
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var saveFollowMeConfig = function(userUuid, destNum, destType, priority, ringTOut)
    {
      return $http({
        method: 'POST',
        url: 'http://localhost:8820/DVP/API/1.0.0.0/PBXService/PBXUser/' + userUuid + '/FollowMe',
        headers: {
          'authorization': authToken
        },
        data:{DestinationNumber:destNum, ObjCategory: destType, RingTimeout: ringTOut, Priority: priority}
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var saveForwardingConfig = function(userUuid, destNum, destType, disconReason, ringTOut)
    {
      return $http({
        method: 'POST',
        url: 'http://localhost:8820/DVP/API/1.0.0.0/PBXService/PBXUser/' + userUuid + '/Forwarding',
        headers: {
          'authorization': authToken
        },
        data:{DestinationNumber:destNum, ObjCategory: destType, RingTimeout: ringTOut, DisconnectReason: disconReason, IsActive: true}
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var setAllowedNumbers = function(userUuid, allowedNumbers)
    {
      return $http({
        method: 'POST',
        url: 'http://localhost:8820/DVP/API/1.0.0.0/PBXService/PBXUser/' + userUuid + '/AllowedNumbers',
        headers: {
          'authorization': authToken
        },
        data:{AllowedNumbers:allowedNumbers}
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var updatePABXUser = function(usrObj)
    {
      return $http({
        method: 'PUT',
        url: 'http://localhost:8820/DVP/API/1.0.0.0/PBXService/PBXUser/' + usrObj.UserUuid,
        headers: {
          'authorization': authToken
        },
        data:usrObj
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var savePABXUser = function(usrObj)
    {
      return $http({
        method: 'POST',
        url: 'http://localhost:8820/DVP/API/1.0.0.0/PBXService/PBXUser',
        headers: {
          'authorization': authToken
        },
        data:usrObj
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var deletePABXTemplate = function(id)
    {
      return $http({
        method: 'DELETE',
        url: 'http://localhost:8820/DVP/API/1.0.0.0/PBXService/PBXUserTemplate/' + id,
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var deletePABXUser = function(userUuid)
    {
      return $http({
        method: 'DELETE',
        url: 'http://localhost:8820/DVP/API/1.0.0.0/PBXService/PBXUser/' + userUuid,
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var getPABXUser = function(id)
    {
      return $http({
        method: 'GET',
        url: 'http://localhost:8820/DVP/API/1.0.0.0/PBXService/PBXUser/' + id,
        headers: {
          'authorization': authToken
        }
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

    var getFollowMeConfigList = function(userUuid)
    {
      return $http({
        method: 'GET',
        url: 'http://localhost:8820/DVP/API/1.0.0.0/PBXService/PBXUser/' + userUuid + '/FollowMe',
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var getForwardingConfigList = function(userUuid)
    {
      return $http({
        method: 'GET',
        url: 'http://localhost:8820/DVP/API/1.0.0.0/PBXService/PBXUser/' + userUuid + '/Forwarding',
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var deleteFollowMe = function(fmId)
    {
      return $http({
        method: 'DELETE',
        url: 'http://localhost:8820/DVP/API/1.0.0.0/PBXService/FollowMe/' + fmId,
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var deleteForwarding = function(fwdId)
    {
      return $http({
        method: 'DELETE',
        url: 'http://localhost:8820/DVP/API/1.0.0.0/PBXService/Forwarding/' + fwdId,
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };



    return {
      getPABXUsers: getPABXUsers,
      getPABXUserTemplates: getPABXUserTemplates,
      postPABXUserTemplate: postPABXUserTemplate,
      deletePABXTemplate: deletePABXTemplate,
      getPABXUser: getPABXUser,
      getGreetingFileMetadata: getGreetingFileMetadata,
      updatePABXUser: updatePABXUser,
      savePABXUser: savePABXUser,
      setAllowedNumbers: setAllowedNumbers,
      getSIPUsers: getSIPUsers,
      deletePABXUser: deletePABXUser,
      getFollowMeConfigList: getFollowMeConfigList,
      saveFollowMeConfig: saveFollowMeConfig,
      deleteFollowMe: deleteFollowMe,
      getForwardingConfigList: getForwardingConfigList,
      saveForwardingConfig: saveForwardingConfig,
      deleteForwarding: deleteForwarding,
      getSchedules: getSchedules
    };
  };

  var module = angular.module("pabxUserApp");
  module.factory("dvpHandler", dvpHandler);

}());
