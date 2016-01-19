/**
 * Created by Pawan on 1/14/2016.
 */
(function () {

  var Userobj;

  var dbservice = function ($http,$mdDialog,$mdMedia){


    var getUserList = function () {
      return $http.get("http://localhost:3636/DVP/API/1.0/CloudConfiguration/CloudEndUsers")
        .then(function (response) {
          console.log("resp  "+JSON.stringify(response));
          return response;
        });
    };

    var getUser = function (uID) {
      console.log("hitttttttt");
      return $http.get("http://localhost:3636/DVP/API/1.0/CloudConfiguration/CloudEndUser/"+uID)
        .then(function (response) {
          console.log("resp single user  "+JSON.stringify(response));
          return response;
        });
    };


    var userDelete = function (user) {

      return $http.delete("http://localhost:3636/DVP/API/1.0/CloudConfiguration/CloudEndUser/"+user)
        .then(function (response) {

          response.id=user;
          return response;
        });

    };

    var updateUser = function (user) {

      return $http.put("http://localhost:3636/DVP/API/1.0/CloudConfiguration/CloudEndUser/"+user.id,user)
        .then(function (response) {

          response.id=user.id;
          return response;
        });

    };

    var newUser = function (user) {

      return $http.post("http://localhost:3636/DVP/API/1.0/CloudConfiguration/CloudEndUser",user)
        .then(function (response) {
          return response;
        });

    }

    var loadClusterDetails = function()
    {
      return $http.get("http://localhost:3636/DVP/API/1.0/CloudConfiguration/Clouds")
        .then(function (response) {
          return response;
        });
    }

    var getContextList = function () {

      return $http.get("http://localhost:8086/DVP/API/6.0/SipUser/Contexts")
        .then(function (response) {
          console.log("Contexts  "+JSON.stringify(response));
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
      getContextList:getContextList/*,
       updateAttribute:updateAttribute,
       NewAttribute:NewAttribute,
       getGroupList:getGroupList,
       GroupObj:GroupObj,
       updateGroup:updateGroup,
       groupDelete:groupDelete,
       NewGroup:NewGroup,
       AddAttributesToGroup:AddAttributesToGroup,
       GID:GID,
       GetAttributesOfGroup:GetAttributesOfGroup,
       GIDst:GIDst,
       showConfirm:showConfirm,
       RemoveAttributeFromGroup:RemoveAttributeFromGroup*/

    };

  };


  var module = angular.module("clduserapp");
  module.factory("dbservice",dbservice);
}());
