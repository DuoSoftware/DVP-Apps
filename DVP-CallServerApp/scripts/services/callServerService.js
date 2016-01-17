/**
 * Created by Rajinda on 12/31/2015.
 */

var clusterModule = angular.module("clusterServiceModule", []);

clusterModule.factory("clusterService", function ($http, $log) {

  //////////////////************** call server **************/////////////////
  var getCallServer = function (id) {
    return $http.get("http://localhost:3636/DVP/API/6.0/CloudConfiguration/CallServer/" + id).then(function (response) {
      if (response.data && response.data.IsSuccess) {
        return response.data.Result;
      } else {
        return {};
      }
    });
  };

  var getCallServers = function () {
    return $http.get("http://localhost:3636/DVP/API/6.0/CloudConfiguration/CallServers").then(function (response) {
      if (response.data && response.data.IsSuccess) {
        return response.data.Result;
      } else {
        return undefined;
      }
    });
  };

  var createCallServer = function (callServer) {

    return $http.post("http://localhost:3636/DVP/API/6.0/CloudConfiguration/CallServer", callServer).then(function (response) {

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
      url: 'http://localhost:3636/DVP/API/6.0/CloudConfiguration/CallServer/' + callServer.id,
      headers: {
        'authorization': '1#1'
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
    return $http.post("http://localhost:3636/DVP/API/6.0/CloudConfiguration/CallServer/" + callServer.id + "/Activate/false", callServer).then(function (response) {
      if (response.data && response.data.IsSuccess) {
        return response.data.IsSuccess;
      } else {
        return false;
      }
    });
  };

  //////////////////************** Cluster Configurations **************/////////////////

  var assignCallServerToCluster = function (callServerId, cloudId) {
    return $http.post("http://localhost:3636/DVP/API/6.0/CloudConfiguration/CallServer/" + callServerId + "/AssignTo/" + cloudId, {}).then(function (response) {
      if (response.data && response.data.IsSuccess) {
        return response.data.IsSuccess;
      } else {
        return false;
      }
    });
  };

  var deleteCallServerFromCluster = function (cloudId, callServerId) {
    return $http.delete("http://localhost:3636/DVP/API/:version/CloudConfiguration/CallServer/" + callServerId + "/AssignTo/" + cloudId).then(function (response) {
      if (response.data && response.data.IsSuccess) {
        return response.data.IsSuccess;
      } else {
        return false;
      }
    });
  };

//////////////////************** Network Configurations **************/////////////////

  var getNetworks = function () {

    return $http.get("http://localhost:3636/DVP/API/6.0/CloudConfiguration/Networks").then(function (response) {

      if (response.data && response.data.IsSuccess) {

        return response.data.Result;


      } else {

        return {};
      }


    });
  };

  var assignNetworkToCluster = function (networkId, cloudId) {
    return $http.post("http://localhost:3636/DVP/API/6.0/CloudConfiguration/Network/" + networkId + "/SetTelcoNetworkToCloud/" + cloudId, {}).then(function (response) {
      if (response.data && response.data.IsSuccess) {
        return response.data.IsSuccess;
      } else {
        return false;
      }
    });
  };

  var deleteNetworkFromCluster = function (cloudId, networkId) {
    return $http.delete("http://localhost:3636/DVP/API/6.0/CloudConfiguration/Network/" + networkId + "/SetTelcoNetworkToCloud/" + cloudId).then(function (response) {
      if (response.data && response.data.IsSuccess) {
        return response.data.IsSuccess;
      } else {
        return false;
      }
    });
  };

  //////////////////************** Profile **************/////////////////

  var getProfile = function (profileId) {

    return $http.get("http://localhost:3636/DVP/API/6.0/CloudConfiguration/Profile/" + profileId).then(function (response) {
      if (response.data && response.data.IsSuccess) {
        return response.data.Result;
      } else {
        return {};
      }
    });
  };

  var getProfiles = function () {

    return $http.get("http://localhost:3636/DVP/API/6.0/CloudConfiguration/Profiles").then(function (response) {

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
      url: 'http://localhost:3636/DVP/API/6.0/CloudConfiguration/Profile/' + profile.id,
      headers: {
        'authorization': '1#1'
      },
      data: profile
    }).then(function (response) {
      return response.data.IsSuccess;
    });
  };

  var createProfile = function (profile) {
    return $http({
      method: 'post',
      url: 'http://localhost:3636/DVP/API/6.0/CloudConfiguration/Profile',
      headers: {
        'authorization': '1#1'
      },
      data: profile
    }).then(function (response) {
      return response.data.IsSuccess;
    });
  };

  var deleteProfile = function (profile) {
    return $http({
      method: 'delete',
      url: 'http://localhost:3636/DVP/API/6.0/CloudConfiguration/Profile/' + profile.id,
      headers: {
        'authorization': '1#1'
      }
    }).then(function (response) {
      return response.data.IsSuccess;
    });
  };

  var assignSipProfileToCallServer = function (profile) {
    return $http({
      method: 'post',
      url: 'http://localhost:3636/DVP/API/6.0/CloudConfiguration/Profile/'+profile.id +'/SetProfileToCallServer/'+profile.CallServer,
      headers: {
        'authorization': '1#1'
      },
      data: profile
    }).then(function (response) {
      return response.data.IsSuccess;
    });
  };

  var assignSipProfiletoEndUser = function (profile) {
    return $http({
      method: 'post',
      url: 'http://localhost:3636/DVP/API/6.0/CloudConfiguration/Profile/'+profile.id +'/SetProfileToEndUser/'+profile.EndUser,
      headers: {
        'authorization': '1#1'
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
      url: 'http://localhost:3636/DVP/API/6.0/CloudConfiguration/IPAddress',
      headers: {
        'authorization': '1#1'
      },
      data: profile
    }).then(function (response) {
      return response.data.IsSuccess;
    });
  };

  var getIpAddresses = function () {

    return $http.get("http://localhost:3636/DVP/API/6.0/CloudConfiguration/IPAddresses").then(function (response) {

      if (response.data && response.data.IsSuccess) {

        return response.data.Result;


      } else {

        return {};
      }


    });
  };

  //////////////////************** End Users **************/////////////////
  var getEndUsers = function () {

    return $http.get("http://localhost:3636/DVP/API/6.0/CloudConfiguration/CloudEndUsers").then(function (response) {

      if (response.data && response.data.IsSuccess) {

        return response.data.Result;


      } else {

        return {};
      }


    });
  };


  return {

    GetEndUsers:getEndUsers,
    CreateIpAddress:createIpAddress,
    GetIpAddresses:getIpAddresses,
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
