/**
 * Created by Rajinda on 12/31/2015.
 */

var clusterModule = angular.module("networkServiceModule", []);

clusterModule.factory("networkService", function ($http, $log,authService,baseUrl) {

  var getNetwork = function (networkId) {

    return $http.get(baseUrl + "CloudConfiguration/Network/" + networkId,{
      headers:{authorization:authService.Token}
    }).then(function (response) {
      if (response.data && response.data.IsSuccess) {
        return response.data.Result;
      } else {
        return {};
      }
    });
  };

  var getNetworks = function () {

    return $http.get(baseUrl + "CloudConfiguration/Networks",{
      headers:{authorization:authService.Token}
    }).then(function (response) {

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
      url: baseUrl + "CloudConfiguration/Network/" + network.id,
      headers: {
        authorization:authService.Token
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
      url: baseUrl + "CloudConfiguration/Network/"+type,
      headers: {
        authorization:authService.Token
      },
      data: network
    }).then(function (response) {
      return response.data.IsSuccess;
    });
  };

  var deleteNetwork = function (network) {
    return $http({
      method: 'delete',
      url: baseUrl + "CloudConfiguration/Network/"+network.id,
      headers: {
        authorization:authService.Token
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
