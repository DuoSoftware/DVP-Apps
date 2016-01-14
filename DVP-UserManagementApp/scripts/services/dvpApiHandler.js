/**
 * Created by dinusha on 1/14/2016.
 */
(function() {

  var dvpHandler = function($http)
  {
    var getPABXUsers = function()
    {
      return $http({
        method: 'GET',
        url: 'http://pbxservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PBXService/PbxUsers',
        headers: {
          'authorization': 'hhhh'
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
          'authorization': 'hhhh'
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
        url: 'http://pbxservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PBXService/PbxUser/' + userUuid + '/PbxUserTemplates',
        headers: {
          'authorization': 'hhhh'
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
        url: 'http://pbxservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PBXService/PBXUser/' + userUuid + '/PbxUserTemplate',
        headers: {
          'authorization': 'hhhh'
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
        url: 'http://pbxservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PBXService/PBXUser/' + userUuid + '/FollowMe',
        headers: {
          'authorization': 'hhhh'
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
        url: 'http://pbxservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PBXService/PBXUser/' + userUuid + '/Forwarding',
        headers: {
          'authorization': 'hhhh'
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
        url: 'http://pbxservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PBXService/PBXUser/' + userUuid + '/AllowedNumbers',
        headers: {
          'authorization': 'hhhh'
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
        url: 'http://pbxservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PBXService/PBXUser/' + usrObj.UserUuid,
        headers: {
          'authorization': 'hhhh'
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
        url: 'http://pbxservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PBXService/PbxUser',
        headers: {
          'authorization': 'hhhh'
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
        url: 'http://pbxservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PBXService/PbxUserTemplate/' + id,
        headers: {
          'authorization': 'hhhh'
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
        url: 'http://pbxservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PBXService/PbxUser/' + userUuid,
        headers: {
          'authorization': 'hhhh'
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
        url: 'http://pbxservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PBXService/PbxUser/' + id,
        headers: {
          'authorization': 'hhhh'
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

    var getFollowMeConfigList = function(userUuid)
    {
      return $http({
        method: 'GET',
        url: 'http://pbxservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PBXService/PbxUser/' + userUuid + '/FollowMe',
        headers: {
          'authorization': 'hhhh'
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
        url: 'http://pbxservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PBXService/PbxUser/' + userUuid + '/Forwarding',
        headers: {
          'authorization': 'hhhh'
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
        url: 'http://pbxservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PBXService/FollowMe/' + fmId,
        headers: {
          'authorization': 'hhhh'
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
        url: 'http://pbxservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PBXService/Forwarding/' + fwdId,
        headers: {
          'authorization': 'hhhh'
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

  var module = angular.module("userManagementApp");
  module.factory("dvpHandler", dvpHandler);

}());
