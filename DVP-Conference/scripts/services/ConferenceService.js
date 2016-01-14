/**
 * Created by a on 1/11/2016.
 */

/**
 * Created by a on 12/10/2015.
 */

var taskModule = angular.module("conferenceService", []);

taskModule.factory("conference", function($http){




  var getConferences = function(){

    return $http.get("http://127.0.0.1:8085/DVP/API/6.0/ConferenceConfiguration/ConferenceRooms").then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }


    });
  }

  var getConference = function(name){



    return $http.get("http://127.0.0.1:8085/DVP/API/6.0/ConferenceConfiguration/ConferenceRoom/" + name).then(function(response) {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }

    });

  }


  var deleteConference = function(name){



    return $http.delete("http://127.0.0.1:8085/DVP/API/6.0/ConferenceConfiguration/ConferenceRoom/" + name).then(function(response) {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }

    });

  }


  var updateConference = function(conference){




      return $http.put("http://127.0.0.1:8085/DVP/API/6.0/ConferenceConfiguration/ConferenceRoom/" + conference.ConferenceName,conference).then(function(response) {
        if(response.data && response.data.IsSuccess) {

          return response.data.Result;


        }else{

          return null;
        }

      });

  }


  var createConference = function(conference){



    return $http.post("http://127.0.0.1:8085/DVP/API/6.0/ConferenceConfiguration/ConferenceRoom",conference).then(function(response) {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }

    });

  }




  return{

    GetConferences : getConferences,
    GetConference: getConference,
    DeleteConference: deleteConference,
    CreateConference: createConference,
    UpdateConference: updateConference,
    Conference: {}


  }


});

