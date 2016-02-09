/**
 * Created by Pawan on 12/11/2015.
 */
(function () {

  var Attribobj;
  var GroupObj;
  var GID;
  var GIDst = false;

  var dbcontroller = function ($http,$mdDialog,$mdMedia) {

    var getAttributeList = function () {


      return $http({
        method: 'GET',
        url: "http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Attributes",
        headers: {
          'authorization': '1#1'
        }
      }).then(function(response)
      {
        return response;
      });

    };



    var attribDelete = function (Attribute) {

      return $http({
        method: 'DELETE',
        url: "http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Attribute/"+Attribute.AttributeId,
        headers: {
          'authorization': '1#1'
        }
      }).then(function(response)
      {
        return response;
      });



    };

    var updateAttribute = function (edtObj) {


      return $http({
        method: 'PUT',
        url: "http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Attribute/"+edtObj.AttributeId,
        headers: {
          'authorization': '1#1'
        },
        data:edtObj
      }).then(function(response)
      {
        return response;
      });

    };


    var NewAttribute = function(data)
    {

      return $http({
        method: 'POST',
        url: "http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Attribute",
        headers: {
          'authorization': '1#1'
        },
        data:data
      }).then(function(response)
      {
        return response;
      });

    };

    var getGroupList = function () {

      return $http({
        method: 'GET',
        url: "http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Groups",
        headers: {
          'authorization': '1#1'
        }
      }).then(function(response)
      {
        return response;
      });

    };

    var updateGroup = function (edtObj) {

      return $http({
        method: 'PUT',
        url: "http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Group/" + edtObj.GroupId,
        headers: {
          'authorization': '1#1'
        },
        data:edtObj
      }).then(function(response)
      {
        return response;
      });

    };

    var groupDelete = function (group) {

      return $http({
        method: 'DELETE',
        url: "http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Group/"+group.GroupId,
        headers: {
          'authorization': '1#1'
        }
      }).then(function(response)
      {
        response.GroupId= group.GroupId;
        return response;
      });


    };

    var NewGroup = function(grpObj)
    {

      return $http({
        method: 'POST',
        url: "http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Group",
        headers: {
          'authorization': '1#1'
        },
        data:grpObj
      }).then(function(response)
      {
        return response;
      });

    };

    var AddAttributesToGroup = function(AttributeIds,GID){

      var data ={
        OtherData:"Temp",
        AttributeIds:AttributeIds


      };

      return $http({
        method: 'PUT',
        url: "http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Group/"+GID+"/Attribute",
        headers: {
          'authorization': '1#1'
        },
        data:data
      }).then(function(response)
      {
        return response;
      });


    };



    var RemoveAttributeFromGroup = function (attributeId,groupId) {


      return $http({
        method: 'DELETE',
        url: "http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Group/"+groupId+"/Attribute/"+attributeId,
        headers: {
          'authorization': '1#1'
        }
      }).then(function(response)
      {
        return response;
      });


    };

    var GetAttributesOfGroup = function (GrpID) {

      return $http({
        method: 'GET',
        url: "http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Group/"+GrpID+"/Attribute/Details",
        headers: {
          'authorization': '1#1'
        }
      }).then(function(response)
      {
        return response;
      });


    };



    var showConfirm = function(tittle, label, okbutton, cancelbutton, content, OkCallback, CancelCallBack, okObj) {

      var confirm = $mdDialog.confirm()
        .title(tittle)
        //.textContent(content)
        .ok(okbutton)
        .cancel(cancelbutton);
      $mdDialog.show(confirm).then(function() {
        OkCallback(okObj);
      }, function() {
        CancelCallBack();
      });
    };







    return{
      getAttributeList:getAttributeList,
      attribDelete:attribDelete,
      Attribobj:Attribobj,
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
      RemoveAttributeFromGroup:RemoveAttributeFromGroup

    };
  };

  var module = angular.module("attributeapp");
  module.factory("dbcontroller",dbcontroller);
}());


