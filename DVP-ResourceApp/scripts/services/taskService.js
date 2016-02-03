/**
 * Created by a on 12/10/2015.
 */

var taskModule = angular.module("taskService", []);

taskModule.factory("task", function($http){




  var getTasks = function(){

    return $http.get("http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Tasks").then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }


    });
  }

  var getTsk = function(id){



    return $http.get("http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Task/" + id).then(function(response) {
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

