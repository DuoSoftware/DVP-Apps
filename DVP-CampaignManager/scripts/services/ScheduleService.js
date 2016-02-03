/**
 * Created by a on 1/22/2016.
 */


var taskModule = angular.module("scheduleService", []);

taskModule.factory("schedule", function($http){

  var getSchedules = function(){

    return $http.get("http://limithandler.104.131.67.21.xip.io/DVP/API/1.0.0.0/LimitAPI/Schedules").then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return [];
      }


    });
  }






  return{

    GetSchedules : getSchedules


  }


});

