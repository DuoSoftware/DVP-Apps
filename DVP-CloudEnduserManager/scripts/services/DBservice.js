/**
 * Created by Pawan on 1/14/2016.
 */
(function () {

  var Userobj;

  var dbservice = function ($http,$mdDialog,$mdMedia){


    var getUserList = function () {
      return $http.get("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/CloudEndUsers")
        .then(function (response) {
          console.log("resp  "+JSON.stringify(response));
          return response;
        });
    };

    var getUser = function (uID) {
      console.log("hitttttttt");
      return $http.get("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/CloudEndUser/"+uID)
        .then(function (response) {
          console.log("resp single user  "+JSON.stringify(response));
          return response;
        });
    };


    var userDelete = function (user) {

      return $http.delete("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/1.0/CloudConfiguration/CloudEndUser/"+user)
        .then(function (response) {

          response.id=user;
          return response;
        });

    };

    var updateUser = function (user) {

      return $http.put("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/CloudEndUser/"+user.id,user)
        .then(function (response) {

          response.id=user.id;
          return response;
        });

    };

    var newUser = function (user) {

      return $http.post("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/CloudEndUser",user)
        .then(function (response) {
          return response;
        });

    }

    var loadClusterDetails = function()
    {
      return $http.get("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/Clouds")
        .then(function (response) {
          return response;
        });
    }

    var getContextList = function () {

      return $http.get("http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Contexts")
        .then(function (response) {
          console.log("Contexts  "+JSON.stringify(response));
          return response;
        });

    };

    var newContext = function(newObj)
    {
      return $http.post("http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Context",newObj)
        .then(function (response) {
          return response;
        });
    };

    var getContext = function (context) {
      console.log("hitttttttt");
      return $http.get("http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Context/"+context)
        .then(function (response) {
          console.log("resp single Context  "+JSON.stringify(response));
          return response;
        });
    };

    var updateContext = function (contextObj) {
      console.log("hitttttttt");
      return $http.put("http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Context/"+contextObj.Context,contextObj)
        .then(function (response) {
          return response;
        });
    };

    var deleteContext = function (contextObj) {

      return $http.delete("http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Context/"+contextObj.Context)
        .then(function (response) {
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
