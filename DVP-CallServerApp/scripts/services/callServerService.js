/**
 * Created by Rajinda on 12/31/2015.
 */

var clusterModule = angular.module("clusterServiceModule", []);

clusterModule.factory("clusterService", function ($http, $log) {

  //////////////////************** call server **************/////////////////
  var authToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaW51c2hhZGNrIiwianRpIjoiYjExYzg3YjktMzYyNS00ZWE0LWFlZWMtYzE0NGEwNjZlM2I5Iiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE4OTM2NTQyNzEsInRlbmFudCI6MSwiY29tcGFueSI6Mywic2NvcGUiOlt7InJlc291cmNlIjoiYWxsIiwiYWN0aW9ucyI6ImFsbCJ9XSwiaWF0IjoxNDYxNjUwNjcxfQ.j4zqaDSeuYIw5fy8AkiBTglyLpjV-Cucmlp1qdq9CfA';

  var getCallServer = function (id) {

    return $http.get("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/CallServer/" + id,
      {
        headers:{authorization:authToken}
      }).then(function (response) {
        if (response.data && response.data.IsSuccess) {
          return response.data.Result;
        } else {
          return {};
        }
      });
  };

  var getCallServers = function () {
    return $http.get("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/CallServers", {
      headers:{authorization:authToken}
    }).then(function (response) {
      if (response.data && response.data.IsSuccess) {
        return response.data.Result;
      } else {
        return undefined;
      }
    });
  };

  var createCallServer = function (callServer) {

    return $http.post( "http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/CallServer", callServer, {
      headers:{authorization:authToken}
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
      url: 'http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/CallServer/' + callServer.id,
      headers: {
        'authorization': authToken
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
    return $http.post("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/CallServer/" + callServer.id + "/Activate/false", {
      headers:{authorization:authToken}
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
    return $http.post("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/CallServer/" + callServerId + "/AssignTo/" + cloudId, {
      headers:{authorization:authToken}
    }, {}).then(function (response) {
      if (response.data && response.data.IsSuccess) {
        return response.data.IsSuccess;
      } else {
        return false;
      }
    });
  };

  var deleteCallServerFromCluster = function (cloudId, callServerId) {
    return $http.delete("http://localhost:3636/DVP/API/:version/CloudConfiguration/CallServer/" + callServerId + "/AssignTo/" + cloudId, {
      headers:{authorization:authToken}
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

    return $http.get("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/Networks",{
      headers:{authorization:authToken}
    }).then(function (response) {

      if (response.data && response.data.IsSuccess) {

        return response.data.Result;


      } else {

        return {};
      }


    });
  };

  var assignNetworkToCluster = function (networkId, cloudId) {
    return $http.post("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/Network/" + networkId + "/SetTelcoNetworkToCloud/" + cloudId, {
      headers:{authorization:authToken}
    }, {}).then(function (response) {
      if (response.data && response.data.IsSuccess) {
        return response.data.IsSuccess;
      } else {
        return false;
      }
    });
  };

  var deleteNetworkFromCluster = function (cloudId, networkId) {
    return $http.delete("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/Network/" + networkId + "/SetTelcoNetworkToCloud/" + cloudId, {
      headers:{authorization:authToken}
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

    return $http.get("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/Profile/" + profileId, {
      headers:{authorization:authToken}
    }).then(function (response) {
      if (response.data && response.data.IsSuccess) {
        return response.data.Result;
      } else {
        return {};
      }
    });
  };

  var getProfiles = function () {

    return $http.get("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/Profiles", {
      headers:{authorization:authToken}
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
      url: 'http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/Profile/' + profile.id,
      headers: {
        'authorization': authToken
      },
      data: profile
    }).then(function (response) {
      return response.data.IsSuccess;
    });
  };

  var createProfile = function (profile) {
    return $http({
      method: 'post',
      url: 'http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/Profile',
      headers: {
        'authorization': authToken
      },
      data: profile
    }).then(function (response) {
      return response.data.IsSuccess;
    });
  };

  var deleteProfile = function (profile) {
    return $http({
      method: 'delete',
      url: 'http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/Profile/' + profile.id,
      headers: {
        'authorization': authToken
      }
    }).then(function (response) {
      return response.data.IsSuccess;
    });
  };

  var assignSipProfileToCallServer = function (profile) {
    return $http({
      method: 'post',
      url: 'http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/Profile/'+profile.id +'/SetProfileToCallServer/'+profile.CallServer,
      headers: {
        'authorization': authToken
      },
      data: profile
    }).then(function (response) {
      return response.data.IsSuccess;
    });
  };

  var assignSipProfiletoEndUser = function (profile) {
    return $http({
      method: 'post',
      url: 'http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/Profile/'+profile.id +'/SetProfileToEndUser/'+profile.EndUser,
      headers: {
        'authorization': authToken
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
      url: 'http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/IPAddress',
      headers: {
        'authorization': authToken
      },
      data: profile
    }).then(function (response) {
      return response.data.IsSuccess;
    });
  };

  var getIpAddresses = function () {

    return $http.get("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/IPAddresses", {
      headers:{authorization:authToken}
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
      url: 'http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/IPAddress/' + ip.id,
      headers: {
        'authorization': authToken
      }
    }).then(function (response) {
      return response.data.IsSuccess;
    });
  };

  //////////////////************** End Users **************/////////////////
  var getEndUsers = function () {

    return $http.get("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/CloudEndUsers", {
      headers:{authorization:authToken}
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
