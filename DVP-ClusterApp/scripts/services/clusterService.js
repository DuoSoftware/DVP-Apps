/**
 * Created by Rajinda on 12/31/2015.
 */

var clusterModule = angular.module("clusterServiceModule", []);

clusterModule.factory("clusterService", function($http,$log){

//http://localhost:3636/DVP/API/6.0
  //http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0

  var getClusters = function(){

    return $http.get("http://localhost:3636/DVP/API/6.0/CloudConfiguration/Clouds").then(function(response){

      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }


    });
  };

  var getCluster = function(id){
    return $http.get("http://localhost:3636/DVP/API/6.0/CloudConfiguration/Cloud/" + id).then(function(response) {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }

    });

  }

  var deleteCluster = function(cluster){


    return $http.post("http://localhost:3636/DVP/API/6.0/CloudConfiguration/Cloud/"+ cluster.id+"/Activate/false",cluster ).then(function(response) {
      if(response.data && response.data.IsSuccess) {

        return response.data.IsSuccess;


      }else{

        return {};
      }

    });

  }

  var updateCluster = function (cluster) {
    return $http({
      method: 'put',
      url: 'http://localhost:3636/DVP/API/6.0/CloudConfiguration/Cloud/' + cluster.id,
      headers: {
        'authorization': '1#1'
      },
      data: cluster
    }).then(function (response) {
       return response.data.IsSuccess;
    });
  };

  var createCluster = function(cluster){

    return $http.post("http://localhost:3636/DVP/API/6.0/CloudConfiguration/Cloud",cluster).then(function(response) {
      $log.debug("createCluster"+response.data);
      if(response.data && response.data.IsSuccess) {

        return  cluster;//response.data.Result;// no data


      }

    });

  };

  var addLoadBalancer =function(cluster){

    var loadBalance = {
      "Type": cluster.LoadBalancer.Type,
      "MainIP": cluster.LoadBalancer.MainIP,
      "ClusterID": cluster.id,
    };

    return $http.post("http://localhost:3636/DVP/API/6.0/CloudConfiguration/LoadBalancer",loadBalance).then(function(response) {
      $log.debug("addLoadBalancer"+response.data);
      if(response.data && response.data.IsSuccess) {

        return  response.data.IsSuccess;// no data
      }
      else{
        return false;
      }
    });

  };

  return{

    GetClusters : getClusters,
    GetCluster: getCluster,
    UpdateCluster: updateCluster,
    CreateCluster: createCluster,
    DeleteCluster: deleteCluster,
    AddLoadBalancer:addLoadBalancer,
    Cluster: {}

  }

});
