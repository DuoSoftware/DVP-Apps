/**
 * Created by a on 1/11/2016.
 */

/**
 * Created by a on 12/10/2015.
 */

var taskModule = angular.module("conferenceService", []);

taskModule.factory("conference", function($http){

  var authToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaW51c2hhZGNrIiwianRpIjoiYjExYzg3YjktMzYyNS00ZWE0LWFlZWMtYzE0NGEwNjZlM2I5Iiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE4OTM2NTQyNzEsInRlbmFudCI6MSwiY29tcGFueSI6Mywic2NvcGUiOlt7InJlc291cmNlIjoiYWxsIiwiYWN0aW9ucyI6ImFsbCJ9XSwiaWF0IjoxNDYxNjUwNjcxfQ.j4zqaDSeuYIw5fy8AkiBTglyLpjV-Cucmlp1qdq9CfA';


  var getConferences = function(){


    return $http({
      method: 'GET',
      url: "http://conference.104.131.67.21.xip.io/DVP/API/1.0.0.0/ConferenceConfiguration/ConferenceRooms",
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

    /*return $http.get("http://conference.104.131.67.21.xip.io/DVP/API/1.0.0.0/ConferenceConfiguration/ConferenceRooms").then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }


    });*/
  };


  var getConference = function(name){


    return $http({
      method: 'GET',
      url: "http://conference.104.131.67.21.xip.io/DVP/API/1.0.0.0/ConferenceConfiguration/ConferenceRoom/" + name,
      headers: {
        'authorization': authToken
      }
    }).then(function(response)
    {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return undefined;
      }

    });


   /* return $http.get("http://conference.104.131.67.21.xip.io/DVP/API/1.0.0.0/ConferenceConfiguration/ConferenceRoom/" + name).then(function(response) {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return undefined;
      }

    });*/

  }


  var deleteConference = function(name){

    return $http({
      method: 'DELETE',
      url: "http://conference.104.131.67.21.xip.io/DVP/API/1.0.0.0/ConferenceConfiguration/ConferenceRoom/" + name,
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

    /*return $http.delete("http://conference.104.131.67.21.xip.io/DVP/API/1.0.0.0/ConferenceConfiguration/ConferenceRoom/" + name).then(function(response) {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;



      }else{

        return {};
      }

    });*/

  }


  var updateConference = function(conference){

    return $http({
      method: 'PUT',
      url: "http://conference.104.131.67.21.xip.io/DVP/API/1.0.0.0/ConferenceConfiguration/ConferenceRoom/" + conference.ConferenceName,
      headers: {
        'authorization': authToken
      },
      data:conference
    }).then(function(response)
    {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return null;
      }

    });


      /*return $http.put("http://conference.104.131.67.21.xip.io/DVP/API/1.0.0.0/ConferenceConfiguration/ConferenceRoom/" + conference.ConferenceName,conference).then(function(response) {
        if(response.data && response.data.IsSuccess) {

          return response.data.Result;


        }else{

          return null;
        }

      });*/

  };


  var createConference = function(conference){


    return $http({
      method: 'POST',
      url: "http://conference.104.131.67.21.xip.io/DVP/API/1.0.0.0/ConferenceConfiguration/ConferenceRoom",
      headers: {
        'authorization': authToken
      },
      data:conference
    }).then(function(response)
    {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return undefined;
      }

    });


    /*return $http.post("http://conference.104.131.67.21.xip.io/DVP/API/1.0.0.0/ConferenceConfiguration/ConferenceRoom",conference).then(function(response) {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return undefined;
      }

    });*/

  };


  var addUserToConference = function(conferenceName,user){


    ///DVP/API/'+version+'/ConferenceConfiguration/ConferenceUser/:UserId/AddToRoom/:RoomName
    return $http({
      method: 'POST',
      url: "http://conference.104.131.67.21.xip.io/DVP/API/1.0.0.0/ConferenceConfiguration/ConferenceUser/"+user.id+"/AddToRoom"+conferenceName,
      headers: {
        'authorization': authToken
      },
      data:user
    }).then(function(response)
    {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return undefined;
      }

    });


   /* return $http.post("http://conference.104.131.67.21.xip.io/DVP/API/1.0.0.0/ConferenceConfiguration/ConferenceRoom/"+conferenceName+"/user",user).then(function(response) {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return undefined;
      }

    });*/




  };


  var getConferenceUsers = function(name){


    return $http({
      method: 'GET',
      url: "http://conference.104.131.67.21.xip.io/DVP/API/1.0.0.0/Conference/" + name+"/users",
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



   /* return $http.get("http://conference.104.131.67.21.xip.io/DVP/API/1.0.0.0/ConferenceConfiguration/ConferenceRoom/" + name+"/users").then(function(response) {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }

    });*/

  };


  var deleteConferenceUser = function(userID){

    ///ConferenceConfiguration/ConferenceUser/:UserId

    return $http({
      method: 'DELETE',
      url: "http://conference.104.131.67.21.xip.io/DVP/API/1.0.0.0/ConferenceConfiguration/ConferenceUser/" + userID,
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




   /* return $http.delete("http://conference.104.131.67.21.xip.io/DVP/API/1.0.0.0/ConferenceConfiguration/ConferenceUser/" + userID).then(function(response) {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }

    });*/

  };


  var updateConferenceUser = function(userID, user){

    ///ConferenceConfiguration/ConferenceUser/:UserId

    return $http({
      method: 'PUT',
      url: "http://conference.104.131.67.21.xip.io/DVP/API/1.0.0.0/ConferenceConfiguration/ConferenceUser/" + userID,
      headers: {
        'authorization': authToken
      },
      data:user
    }).then(function(response)
    {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }

    });


    /*return $http.put("http://conference.104.131.67.21.xip.io/DVP/API/1.0.0.0/ConferenceConfiguration/ConferenceUser/" + userID, user).then(function(response) {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }

    });*/

  };

  var updateConferenceUserModes = function(userID, user){

    ///ConferenceConfiguration/ConferenceUser/:UserId

    return $http({
      method: 'POST',
      url: "http://conference.104.131.67.21.xip.io/DVP/API/1.0.0.0/ConferenceConfiguration/ConferenceUser/" + userID+"/Mode",
      headers: {
        'authorization': authToken
      },
      data:user
    }).then(function(response)
    {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }

    });


    /*return $http.post("http://conference.104.131.67.21.xip.io/DVP/API/1.0.0.0/ConferenceConfiguration/ConferenceUser/" + userID+"/Mode", user).then(function(response) {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }

    });*/

  };





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

