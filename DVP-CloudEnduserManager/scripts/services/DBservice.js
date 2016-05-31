/**
 * Created by Pawan on 1/14/2016.
 */
(function () {

  var Userobj;

  var dbservice = function ($http,$mdDialog,$mdMedia){

    var authToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaW51c2hhZGNrIiwianRpIjoiMjViZjZmZTItZjZjNC00ZWJhLWFmODgtNmMxNjIxOTU4OGRiIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE4OTI0NDE2NzIsInRlbmFudCI6MSwiY29tcGFueSI6Mywic2NvcGUiOlt7InJlc291cmNlIjoiYWxsIiwiYWN0aW9ucyI6ImFsbCJ9XSwiaWF0IjoxNDYwNDM4MDcyfQ.aPoVPiTtoGFgnKmhdLBTzwTrQRTGWWliYujHP5NONqU';

    var getUserList = function () {

      return $http({
        method: 'GET',
        url: "http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/CloudEndUsers",
        headers: {
          'authorization': authToken
        }
      }).then(function(response)
      {
        return response;
      });

    };

    var getUser = function (uID) {

      return $http({
        method: 'GET',
        url: "http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/CloudEndUser/"+uID,
        headers: {
          'authorization': authToken
        }
      }).then(function(response)
      {
        return response;
      });

    };


    var userDelete = function (user) {

      return $http({
        method: 'DELETE',
        url: "http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/CloudEndUser/"+user,
        headers: {
          'authorization': authToken
        }
      }).then(function(response)
      {
        response.id=user;
        return response;
      });



    };

    var updateUser = function (user) {

      return $http({
        method: 'PUT',
        url: "http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/CloudEndUser/"+user.id,
        headers: {
          'authorization': authToken
        },
        data:user
      }).then(function(response)
      {
        return response;
      });


    };

    var newUser = function (user) {

      return $http({
        method: 'POST',
        url: "http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/CloudEndUser",
        headers: {
          'authorization': authToken
        },
        data:user
      }).then(function(response)
      {
        return response;
      });

    };

    var loadClusterDetails = function()
    {

      return $http({
        method: 'GET',
        url: "http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/Clouds",
        headers: {
          'authorization': authToken
        }
      }).then(function(response)
      {
        return response;
      });

    };

    var getContextList = function () {


      return $http({
        method: 'GET',
        url: "http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Contexts",
        headers: {
          'authorization': authToken
        }
      }).then(function(response)
      {
        return response;
      });


    };

    var newContext = function(newObj)
    {

      return $http({
        method: 'POST',
        url: "http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Context",
        headers: {
          'authorization': authToken
        },
        data:newObj
      }).then(function(response)
      {
        return response;
      });


    };

    var getContext = function (context) {

      return $http({
        method: 'GET',
        url: "http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Context/"+context,
        headers: {
          'authorization': authToken
        }
      }).then(function(response)
      {
        return response;
      });

    };

    var updateContext = function (contextObj) {

      return $http({
        method: 'PUT',
        url: "http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Context/"+contextObj.Context,
        headers: {
          'authorization': authToken
        },
        data:contextObj

      }).then(function(response)
      {
        return response;
      });

    };

    var deleteContext = function (contextObj) {

      return $http({
        method: 'DELETE',
        url: "http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Context/"+contextObj.Context,
        headers: {
          'authorization': authToken
        }

      }).then(function(response)
      {
        return response;
      });

    };

    return{
      Userobj:Userobj,
      userDelete:userDelete,
      getUserList:getUserList,
      updateUser:updateUser,
      newUser:newUser,
      getUser:getUser,
      loadClusterDetails:loadClusterDetails,
      getContextList:getContextList,
      newContext:newContext,
      getContext:getContext,
      updateContext:updateContext,
      deleteContext:deleteContext

    };

  };


  var module = angular.module("clduserapp");
  module.factory("dbservice",dbservice);
}());
