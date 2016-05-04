/**
 * Created by a on 12/10/2015.
 */

var taskModule = angular.module("taskService", []);

taskModule.factory("task", function($http){


  var authToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaW51c2hhZGNrIiwianRpIjoiMjViZjZmZTItZjZjNC00ZWJhLWFmODgtNmMxNjIxOTU4OGRiIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE4OTI0NDE2NzIsInRlbmFudCI6MSwiY29tcGFueSI6Mywic2NvcGUiOlt7InJlc291cmNlIjoiYWxsIiwiYWN0aW9ucyI6ImFsbCJ9XSwiaWF0IjoxNDYwNDM4MDcyfQ.aPoVPiTtoGFgnKmhdLBTzwTrQRTGWWliYujHP5NONqU';

  var getTasks = function(){


    return $http({
      method: 'GET',
      url: "http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Tasks",
      headers: {
        'authorization': authToken
      }

    }).then(function(response)
    {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }

    });



    /*return $http.get("http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Tasks").then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }


    });*/
  };

  var getTsk = function(id){

    return $http({
      method: 'GET',
      url: "http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Task/" + id,
      headers: {
        'authorization': authToken
      }

    }).then(function(response)
    {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }

    });



   /* return $http.get("http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Task/" + id).then(function(response) {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }

    });*/

  }





  return{

    GetTasks : getTasks,
    GetTask: getTsk


  }


});

