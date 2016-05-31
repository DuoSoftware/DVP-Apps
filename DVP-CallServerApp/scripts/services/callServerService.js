/**
 * Created by Rajinda on 12/31/2015.
 */

var clusterModule = angular.module("clusterServiceModule", []);

clusterModule.factory("clusterService", function ($http, $log,authService,baseUrl) {

  //////////////////************** call server **************/////////////////


  var getCallServer = function (id) {

    return $http.get(baseUrl+ "CallServer/" + id,
      {
        headers:{authorization:authService.Token}
      }).then(function (response) {
        if (response.data && response.data.IsSuccess) {
          return response.data.Result;
        } else {
          return {};
        }
      });
  };

  var getCallServers = function () {
    return $http.get(baseUrl+ "CallServers", {
      headers:{authorization:authService.Token}
    }).then(function (response) {
      if (response.data && response.data.IsSuccess) {
        return response.data.Result;
      } else {
        return undefined;
      }
    });
  };

  var createCallServer = function (callServer) {

    return $http.post( baseUrl+ "CallServer", callServer, {
      headers:{authorization:authService.Token}
    }).then(function (response) {

      if (response.data && response.data.IsSuccess) {
        return response.data.IsSuccess;
      }
      else
        return false;
    });

  };

  var updateCallServer = function (callServer) {
    return $http({
      method: 'put',
      url: baseUrl+ "/CallServer/" + callServer.id,
      headers: {
        'authorization': authService.Token
      },
      data: callServer
    }).then(function (response) {
      if (response.data && response.data.IsSuccess) {
        return response.data.IsSuccess;
      } else {
        return false;
      }
    });
  };

  var deleteCallServer = function (callServer) {
    return $http.post(baseUrl+ "CallServer/" + callServer.id + "/Activate/false", {
      headers:{authorization:authService.Token}
    }, callServer).then(function (response) {
      if (response.data && response.data.IsSuccess) {
        return response.data.IsSuccess;
      } else {
        return false;
      }
    });
  };

  //////////////////************** Cluster Configurations **************/////////////////

  var assignCallServerToCluster = function (callServerId, cloudId) {
    return $http.post(baseUrl+ "CallServer/" + callServerId + "/AssignTo/" + cloudId, {
      headers:{authorization:authService.Token}
    }, {}).then(function (response) {
      if (response.data && response.data.IsSuccess) {
        return response.data.IsSuccess;
      } else {
        return false;
      }
    });
  };

  var deleteCallServerFromCluster = function (cloudId, callServerId) {
    return $http.delete(baseUrl+ "CallServer/" + callServerId + "/AssignTo/" + cloudId, {
      headers:{authorization:authService.Token}
    }).then(function (response) {
      if (response.data && response.data.IsSuccess) {
        return response.data.IsSuccess;
      } else {
        return false;
      }
    });
  };

//////////////////************** Network Configurations **************/////////////////

  var getNetworks = function () {

    return $http.get(baseUrl+ "Networks",{
      headers:{authorization:authService.Token}
    }).then(function (response) {

      if (response.data && response.data.IsSuccess) {

        return response.data.Result;


      } else {

        return {};
      }


    });
  };

  var assignNetworkToCluster = function (networkId, cloudId) {
    return $http.post(baseUrl+ "Network/" + networkId + "/SetTelcoNetworkToCloud/" + cloudId, {
      headers:{authorization:authService.Token}
    }, {}).then(function (response) {
      if (response.data && response.data.IsSuccess) {
        return response.data.IsSuccess;
      } else {
        return false;
      }
    });
  };

  var deleteNetworkFromCluster = function (cloudId, networkId) {
    return $http.delete(baseUrl+ "Network/" + networkId + "/SetTelcoNetworkToCloud/" + cloudId, {
      headers:{authorization:authService.Token}
    }).then(function (response) {
      if (response.data && response.data.IsSuccess) {
        return response.data.IsSuccess;
      } else {
        return false;
      }
    });
  };

  //////////////////************** Profile **************/////////////////

  var getProfile = function (profileId) {

    return $http.get(baseUrl+ "Profile/" + profileId, {
      headers:{authorization:authService.Token}
    }).then(function (response) {
      if (response.data && response.data.IsSuccess) {
        return response.data.Result;
      } else {
        return {};
      }
    });
  };

  var getProfiles = function () {

    return $http.get(baseUrl+ "Profiles", {
      headers:{authorization:authService.Token}
    }).then(function (response) {

      if (response.data && response.data.IsSuccess) {

        return response.data.Result;


      } else {

        return {};
      }


    });
  };

  var updateProfile = function (profile) {
    return $http({
      method: 'put',
      url: baseUrl+ "Profile/" + profile.id,
      headers: {
        'authorization': authService.Token
      },
      data: profile
    }).then(function (response) {
      return response.data.IsSuccess;
    });
  };

  var createProfile = function (profile) {
    return $http({
      method: 'post',
      url: baseUrl+ "Profile",
      headers: {
        'authorization': authService.Token
      },
      data: profile
    }).then(function (response) {
      return response.data.IsSuccess;
    });
  };

  var deleteProfile = function (profile) {
    return $http({
      method: 'delete',
      url: baseUrl+ "Profile/" + profile.id,
      headers: {
        'authorization': authService.Token
      }
    }).then(function (response) {
      return response.data.IsSuccess;
    });
  };

  var assignSipProfileToCallServer = function (profile) {
    return $http({
      method: 'post',
      url: baseUrl+ "Profile/"+profile.id +"/SetProfileToCallServer/"+profile.CallServer,
      headers: {
        'authorization': authService.Token
      },
      data: profile
    }).then(function (response) {
      return response.data.IsSuccess;
    });
  };

  var assignSipProfiletoEndUser = function (profile) {
    return $http({
      method: 'post',
      url: baseUrl+ "Profile/"+profile.id +"/SetProfileToEndUser/"+profile.EndUser,
      headers: {
        'authorization': authService.Token
      },
      data: profile
    }).then(function (response) {
      return response.data.IsSuccess;
    });
  };

  //////////////////************** IPAddresses **************/////////////////
  var createIpAddress = function (profile) {
    return $http({
      method: 'post',
      url: baseUrl+ "/IPAddress",
      headers: {
        'authorization': authService.Token
      },
      data: profile
    }).then(function (response) {
      return response.data.IsSuccess;
    });
  };

  var getIpAddresses = function () {

    return $http.get(baseUrl+ "IPAddresses", {
      headers:{authorization:authService.Token}
    }).then(function (response) {

      if (response.data && response.data.IsSuccess) {

        return response.data.Result;


      } else {

        return {};
      }


    });
  };

  var deleteIpAddresses = function (ip) {
    return $http({
      method: 'delete',
      url: baseUrl+ "IPAddress/" + ip.id,
      headers: {
        'authorization': authService.Token
      }
    }).then(function (response) {
      return response.data.IsSuccess;
    });
  };

  //////////////////************** End Users **************/////////////////
  var getEndUsers = function () {

    return $http.get(baseUrl+ "CloudEndUsers", {
      headers:{authorization:authService.Token}
    }).then(function (response) {

      if (response.data && response.data.IsSuccess) {

        return response.data.Result;


      } else {

        return {};
      }


    });
  };

  var getEndUser = function (endUserId) {

    return $http.get(baseUrl+ "CloudEndUser/"+endUserId, {
      headers:{authorization:authService.Token}
    }).then(function (response) {

      if (response.data && response.data.IsSuccess) {

        return response.data.Result;


      } else {

        return {};
      }


    });
  };

  return {

    GetEndUsers:getEndUsers,
    GetEndUser:getEndUser,
    CreateIpAddress:createIpAddress,
    GetIpAddresses:getIpAddresses,
    DeleteIpAddresses:deleteIpAddresses,
    IpAddress:{},
    GetProfile: getProfile,
    GetProfiles: getProfiles,
    CreateProfile: createProfile,
    UpdateProfile: updateProfile,
    DeleteProfile: deleteProfile,
    AssignSipProfileToCallServer:assignSipProfileToCallServer,
    AssignSipProfiletoEndUser:assignSipProfiletoEndUser,
    Profile: {},
    GetCallServer: getCallServer,
    GetCallServers: getCallServers,
    CreateCallServer: createCallServer,
    UpdateCallServer: updateCallServer,
    DeleteCallServer: deleteCallServer,
    CallServer: {},
    AssignCallServerToCluster: assignCallServerToCluster,
    DeleteCallServerFromCluster: deleteCallServerFromCluster,
    GetNetworks: getNetworks,
    AssignNetworkToCluster: assignNetworkToCluster,
    DeleteNetworkFromCluster: deleteNetworkFromCluster


  }

});
