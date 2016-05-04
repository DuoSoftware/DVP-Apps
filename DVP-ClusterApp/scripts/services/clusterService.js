/**
 * Created by Rajinda on 12/31/2015.
 */

var clusterModule = angular.module("clusterServiceModule", []);

clusterModule.factory("clusterService", function ($http, $log) {

//http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0
  //http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0
  var authToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaW51c2hhZGNrIiwianRpIjoiMjViZjZmZTItZjZjNC00ZWJhLWFmODgtNmMxNjIxOTU4OGRiIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE4OTI0NDE2NzIsInRlbmFudCI6MSwiY29tcGFueSI6Mywic2NvcGUiOlt7InJlc291cmNlIjoiYWxsIiwiYWN0aW9ucyI6ImFsbCJ9XSwiaWF0IjoxNDYwNDM4MDcyfQ.aPoVPiTtoGFgnKmhdLBTzwTrQRTGWWliYujHP5NONqU';
  var getClusters = function () {

    return $http.get("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/Clouds",{
      headers:{authorization:authToken}
    }).then(function (response) {

      if (response.data && response.data.IsSuccess) {

        return response.data.Result;


      } else {

        return {};
      }


    });
  };

  var getCluster = function (id) {
    return $http.get("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/Cloud/" + id,{
      headers:{authorization:authToken}
    }).then(function (response) {
      if (response.data && response.data.IsSuccess) {

        return response.data.Result;


      } else {

        return {};
      }

    });

  };

  var deleteCluster = function (cluster) {


    return $http.post("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/Cloud/" + cluster.id + "/Activate/false",{
      headers:{authorization:authToken}
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
      url: 'http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/Cloud/' + cluster.id,
      headers: {
        'authorization': authToken
      },
      data: cluster
    }).then(function (response) {
      return response.data.IsSuccess;
    });
  };

  var createCluster = function (cluster) {

    return $http.post("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/Cloud",{
      headers:{authorization:authToken}
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

    return $http.post("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/LoadBalancer",{
      headers:{authorization:authToken}
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
    return $http.get("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/CallServer/" + id,{
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
    return $http.get("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/CallServers",{
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

    return $http.post("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/CallServer",{
      headers:{authorization:authToken}
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
    return $http.post("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/CallServer/" + callServer.id + "/Activate/false",{
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

  var assignCallServerToCluster = function (callServerId,cloudId) {
    return $http.post("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/CallServer/"+callServerId+"/AssignTo/"+cloudId,{
      headers:{authorization:authToken}
    },{}).then(function (response) {
      if (response.data && response.data.IsSuccess) {
        return response.data.IsSuccess;
      } else {
        return false;
      }
    });
  };

  var deleteCallServerFromCluster = function (cloudId,callServerId) {
<<<<<<< HEAD
    return $http.delete("http://localhost:3636/DVP/API/:version/CloudConfiguration/CallServer/"+callServerId+"/AssignTo/"+cloudId,{
      headers:{authorization:authToken}
    }).then(function (response) {
=======
    return $http.delete("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/CallServer/"+callServerId+"/AssignTo/"+cloudId).then(function (response) {
>>>>>>> 997cdbdc1b64778914226441f4bc6547216491f7
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

  var assignNetworkToCluster = function (networkId,cloudId) {
    return $http.post("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/Network/"+networkId+"/SetTelcoNetworkToCloud/"+cloudId,{
      headers:{authorization:authToken}
    },{}).then(function (response) {
      if (response.data && response.data.IsSuccess) {
        return response.data.IsSuccess;
      } else {
        return false;
      }
    });
  };

  var deleteNetworkFromCluster = function (cloudId,networkId) {
    return $http.delete("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/Network/"+networkId+"/SetTelcoNetworkToCloud/"+cloudId,{
      headers:{authorization:authToken}
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
