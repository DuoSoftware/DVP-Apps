/**
 * Created by Rajinda on 12/31/2015.
 */

var clusterModule = angular.module("clusterServiceModule", []);

clusterModule.factory("clusterService", function ($http, $log,authService,baseUrl) {

//http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0
  //http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0

  var getClusters = function () {

    return $http.get(baseUrl + "CloudConfiguration/Clouds",{
      headers:{authorization:authService.Token}
    }).then(function (response) {

      if (response.data && response.data.IsSuccess) {

        return response.data.Result;


      } else {

        return {};
      }


    });
  };

  var getCluster = function (id) {
    return $http.get(baseUrl + "CloudConfiguration/Cloud/" + id,{
      headers:{authorization:authService.Token}
    }).then(function (response) {
      if (response.data && response.data.IsSuccess) {

        return response.data.Result;


      } else {

        return {};
      }

    });

  };

  var deleteCluster = function (cluster) {


    return $http.post(baseUrl + "CloudConfiguration/Cloud/" + cluster.id + "/Activate/false",{
      headers:{authorization:authService.Token}
    }, cluster).then(function (response) {
      if (response.data && response.data.IsSuccess) {

        return response.data.IsSuccess;


      } else {

        return {};
      }

    });

  };

  var updateCluster = function (cluster) {
    return $http({
      method: 'put',
      url: baseUrl + "CloudConfiguration/Cloud/" + cluster.id,
      headers: {
        'authorization': authService.Token
      },
      data: cluster
    }).then(function (response) {
      return response.data.IsSuccess;
    });
  };

  var createCluster = function (cluster) {

    return $http.post(baseUrl + "CloudConfiguration/Cloud",{
      headers:{authorization:authService.Token}
    }, cluster).then(function (response) {
      $log.debug("createCluster" + response.data);
      if (response.data && response.data.IsSuccess) {
        return response.data.IsSuccess;
      }else{
        return false;
      }

    });

  };

  var addLoadBalancer = function (cluster) {

    var loadBalance = {
      "Type": cluster.LoadBalancer.Type,
      "MainIP": cluster.LoadBalancer.MainIP,
      "ClusterID": cluster.id,
    };

    return $http.post(baseUrl + "CloudConfiguration/LoadBalancer",{
      headers:{authorization:authService.Token}
    }, loadBalance).then(function (response) {
      $log.debug("addLoadBalancer" + response.data);
      if (response.data && response.data.IsSuccess) {

        return response.data.IsSuccess;// no data
      }
      else {
        return false;
      }
    });

  };

  //////////////////************** call server **************/////////////////
  var getCallServer = function (id) {
    return $http.get(baseUrl + "CloudConfiguration/CallServer/" + id,{
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
    return $http.get(baseUrl + "CloudConfiguration/CallServers",{
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

    return $http.post(baseUrl + "CloudConfiguration/CallServer",{
      headers:{authorization:authService.Token}
    }, callServer).then(function (response) {

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
      url: baseUrl + "CloudConfiguration/CallServer/" + callServer.id,
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
    return $http.post(baseUrl + "CloudConfiguration/CallServer/" + callServer.id + "/Activate/false",{
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

  var assignCallServerToCluster = function (callServerId,cloudId) {
    return $http.post(baseUrl + "CloudConfiguration/CallServer/"+callServerId+"/AssignTo/"+cloudId,{
      headers:{authorization:authService.Token}
    },{}).then(function (response) {
      if (response.data && response.data.IsSuccess) {
        return response.data.IsSuccess;
      } else {
        return false;
      }
    });
  };

  var deleteCallServerFromCluster = function (cloudId,callServerId) {
    return $http.delete(baseUrl + "CloudConfiguration/CallServer/"+callServerId+"/AssignTo/"+cloudId,{
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

    return $http.get(baseUrl + "CloudConfiguration/Networks",{
      headers:{'authorization':authService.Token}
    }).then(function (response) {

      if (response.data && response.data.IsSuccess) {

        return response.data.Result;


      } else {

        return {};
      }


    });
  };

  var assignNetworkToCluster = function (networkId,cloudId) {
    return $http.post(baseUrl + "CloudConfiguration/Network/"+networkId+"/SetTelcoNetworkToCloud/"+cloudId,{
      headers:{authorization:authService.Token}
    },{}).then(function (response) {
      if (response.data && response.data.IsSuccess) {
        return response.data.IsSuccess;
      } else {
        return false;
      }
    });
  };

  var deleteNetworkFromCluster = function (cloudId,networkId) {
    return $http.delete(baseUrl + "CloudConfiguration/Network/"+networkId+"/SetTelcoNetworkToCloud/"+cloudId,{
      headers:{authorization:authService.Token}
    }).then(function (response) {
      if (response.data && response.data.IsSuccess) {
        return response.data.IsSuccess;
      } else {
        return false;
      }
    });
  };

  return {

    GetClusters: getClusters,
    GetCluster: getCluster,
    UpdateCluster: updateCluster,
    CreateCluster: createCluster,
    DeleteCluster: deleteCluster,
    AddLoadBalancer: addLoadBalancer,
    Cluster: {},
    GetCallServer: getCallServer,
    GetCallServers: getCallServers,
    CreateCallServer: createCallServer,
    UpdateCallServer:updateCallServer,
    DeleteCallServer: deleteCallServer,
    CallServer: {},
    AssignCallServerToCluster:assignCallServerToCluster,
    DeleteCallServerFromCluster:deleteCallServerFromCluster,
    GetNetworks:getNetworks,
    AssignNetworkToCluster:assignNetworkToCluster,
    DeleteNetworkFromCluster:deleteNetworkFromCluster


  }

});
