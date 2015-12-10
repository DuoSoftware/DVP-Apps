var resourceModule = angular.module("resourceService", []);

resourceModule.factory("resource", function($http){




  var getResources = function(){

    return $http.get("http://127.0.0.1:8831/DVP/API/6.0/ResourceManager/Resources").then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }


    });
  }

  var getResource = function(id){



      return $http.get("http://127.0.0.1:8831/DVP/API/6.0/ResourceManager/Resource/" + id).then(function(response) {
        if(response.data && response.data.IsSuccess) {

          return response.data.Result;


        }else{

          return {};
        }

      });

  }


  var deleteResource = function(id){



    return $http.delete("http://127.0.0.1:8831/DVP/API/6.0/ResourceManager/Resource/" + id).then(function(response) {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }

    });

  }


  var updateResource = function(resource){



    if(resource && resource.ResourceId)
      return $http.put("http://127.0.0.1:8831/DVP/API/6.0/ResourceManager/Resource/" + resource.ResourceId,resource).then(function(response) {
        if(response.data && response.data.IsSuccess) {

          return response.data.Result;


        }else{

          return {};
        }

      });

  }



  var createResource = function(resource){




      return $http.post("http://127.0.0.1:8831/DVP/API/6.0/ResourceManager/Resource",resource).then(function(response) {
        if(response.data && response.data.IsSuccess) {

          return response.data.Result;


        }

      });

  }


  return{

    GetResources : getResources,
    GetResource: getResource,
    UpdateResource: updateResource,
    CreateResource: createResource,
    DeleteResource: deleteResource,
    User: {}

  }


});
