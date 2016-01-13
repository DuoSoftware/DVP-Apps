/**
 * Created by Rajinda on 12/31/2015.
 */

var clusterModule = angular.module("networkServiceModule", []);

clusterModule.factory("networkService", function ($http, $log) {

  var getNetwork = function (networkId) {

    return $http.get("http://localhost:3636/DVP/API/6.0/CloudConfiguration/Network/" + networkId).then(function (response) {
      if (response.data && response.data.IsSuccess) {
        return response.data.Result;
      } else {
        return {};
      }
    });
  };

  var getNetworks = function () {

    return $http.get("http://localhost:3636/DVP/API/6.0/CloudConfiguration/Networks").then(function (response) {

      if (response.data && response.data.IsSuccess) {

        return response.data.Result;


      } else {

        return {};
      }


    });
  };

  var updateNetwork = function (network) {
    return $http({
      method: 'put',
      url: 'http://localhost:3636/DVP/API/6.0/CloudConfiguration/Cloud/' + network.id,
      headers: {
        'authorization': '1#1'
      },
      data: network
    }).then(function (response) {
      return response.data.IsSuccess;
    });
  };

  var createNetwork = function (network) {
    var type = "TelcoNetwork";
    if (network.Type == "USER") {
      type = "UserNetwork";
    }
    return $http({
      method: 'post',
      url: 'http://localhost:3636/DVP/API/6.0/CloudConfiguration/Network/'+type,
      headers: {
        'authorization': '1#1'
      },
      data: network
    }).then(function (response) {
      return response.data.IsSuccess;
    });
  };

  var deleteNetwork = function (network) {
    return $http({
      method: 'delete',
      url: 'http://localhost:3636/DVP/API/6.0/CloudConfiguration/Network/'+network.id,
      headers: {
        'authorization': '1#1'
      }
    }).then(function (response) {
      return response.data.IsSuccess;
    });
  };


  return {

    GetNetwork: getNetwork,
    GetNetworks: getNetworks,
    UpdateNetwork: updateNetwork,
    CreateNetwork: createNetwork,
    DeleteNetwork: deleteNetwork,
    Network: {},
    Networks: []
  }

});
