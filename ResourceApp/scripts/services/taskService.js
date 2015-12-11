/**
 * Created by a on 12/10/2015.
 */

var taskModule = angular.module("taskService", []);

taskModule.factory("task", function($http){




  var getTasks = function(){

    return $http.get("http://127.0.0.1:8831/DVP/API/6.0//ResourceManager/Task").then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }


    });
  }

  var getTsk = function(id){



    return $http.get("http://127.0.0.1:8831/DVP/API/6.0/ResourceManager/Task/" + id).then(function(response) {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }

    });

  }





  return{

    GetTasks : getTasks,
    GetTask: getTsk


  }


});

