/**
 * Created by Rajinda on 12/31/2015.
 */

var clusterModule = angular.module("clusterServiceModule", []);

clusterModule.factory("clusterService", function($http,$log){


  var getClusters = function(){

    return $http.get("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/Clouds").then(function(response){

      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }


    });
  };


  var getCluster = function(id){
    return $http.get("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/Cloud/" + id).then(function(response) {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }

    });

  }


  var deleteCluster = function(id){



    return $http.delete("http://0.0.0.0:3434/DVP/API/6.0/ResourceManager/Resource/" + id).then(function(response) {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }

    });

  }


  var updateCluster = function(cluster){



    if(resource && resource.ResourceId)
      return $http.put("http://0.0.0.0:3434/DVP/API/6.0/ResourceManager/Resource/" + resource.ResourceId,resource).then(function(response) {
        if(response.data && response.data.IsSuccess) {

          return response.data.Result;


        }else{

          return {};
        }

      });

  }


  var createCluster = function(cluster){

    return $http.post("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/Cloud",cluster).then(function(response) {
      $log.debug("createCluster"+response.data);
      if(response.data && response.data.IsSuccess) {

        return  cluster;//response.data.Result;// no data


      }

    });

  };




  return{

    GetClusters : getClusters,
    GetCluster: getCluster,
    UpdateCluster: updateCluster,
    CreateCluster: createCluster,
    DeleteCluster: deleteCluster,
    Cluster: {}

  }

});
