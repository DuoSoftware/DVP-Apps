/**
 * Created by a on 1/11/2016.
 */

/**
 * Created by a on 12/10/2015.
 */

var taskModule = angular.module("conferenceService", []);

taskModule.factory("conference", function($http){




  var getConferences = function(){

    return $http.get("http://conference.104.131.67.21.xip.io/DVP/API/1.0.0.0/ConferenceConfiguration/ConferenceRooms").then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }


    });
  }


  var getConference = function(name){



    return $http.get("http://conference.104.131.67.21.xip.io/DVP/API/1.0.0.0/ConferenceConfiguration/ConferenceRoom/" + name).then(function(response) {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return undefined;
      }

    });

  }


  var deleteConference = function(name){



    return $http.delete("http://conference.104.131.67.21.xip.io/DVP/API/1.0.0.0/ConferenceConfiguration/ConferenceRoom/" + name).then(function(response) {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;



      }else{

        return {};
      }

    });

  }


  var updateConference = function(conference){




      return $http.put("http://conference.104.131.67.21.xip.io/DVP/API/1.0.0.0/ConferenceConfiguration/ConferenceRoom/" + conference.ConferenceName,conference).then(function(response) {
        if(response.data && response.data.IsSuccess) {

          return response.data.Result;


        }else{

          return null;
        }

      });

  }


  var createConference = function(conference){



    return $http.post("http://conference.104.131.67.21.xip.io/DVP/API/1.0.0.0/ConferenceConfiguration/ConferenceRoom",conference).then(function(response) {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return undefined;
      }

    });

  }


  var addUserToConference = function(conferenceName,user){

    return $http.post("http://localhost:8085/DVP/API/1.0.0.0/ConferenceConfiguration/ConferenceRoom/"+conferenceName+"/user",user).then(function(response) {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return undefined;
      }

    });




  }


  var getConferenceUsers = function(name){



    return $http.get("http://conference.104.131.67.21.xip.io/DVP/API/1.0.0.0/ConferenceConfiguration/ConferenceRoom/" + name+"/users").then(function(response) {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }

    });

  }


  var deleteConferenceUser = function(userID){

    ///ConferenceConfiguration/ConferenceUser/:UserId
    return $http.delete("http://conference.104.131.67.21.xip.io/DVP/API/1.0.0.0/ConferenceConfiguration/ConferenceUser/" + userID).then(function(response) {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }

    });

  }


  var updateConferenceUser = function(userID, user){

    ///ConferenceConfiguration/ConferenceUser/:UserId
    return $http.put("http://conference.104.131.67.21.xip.io/DVP/API/1.0.0.0/ConferenceConfiguration/ConferenceUser/" + userID, user).then(function(response) {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }

    });

  }

  var updateConferenceUserModes = function(userID, user){

    ///ConferenceConfiguration/ConferenceUser/:UserId
    return $http.post("http://conference.104.131.67.21.xip.io/DVP/API/1.0.0.0/ConferenceConfiguration/ConferenceUser/" + userID+"/Mode", user).then(function(response) {
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
    AddUserToConference: addUserToConference,
    GetConferenceUsers: getConferenceUsers,
    DeleteConferenceUser: deleteConferenceUser,
    UpdateConferenceUser: updateConferenceUser,
    UpdateConferenceUserModes: updateConferenceUserModes,
    Conference: {}


  }


});

