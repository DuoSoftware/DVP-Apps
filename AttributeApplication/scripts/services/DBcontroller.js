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
      return $http.get("http://127.0.0.1:8831/DVP/API/6.0/ResourceManager/Attributes")
        .then(function (response) {
          return response;
        });
    };



    var attribDelete = function (Attribute) {

      return $http.delete("http://127.0.0.1:8831/DVP/API/6.0/ResourceManager/Attribute/"+Attribute.AttributeId)
        .then(function (response) {

          response.AttributeId=Attribute.AttributeId;
          return response;
        });

    };

    var updateAttribute = function (edtObj) {


      return $http.put("http://127.0.0.1:8831/DVP/API/6.0/ResourceManager/Attribute/"+edtObj.AttributeId,edtObj)
        .then(function (response) {

          return response;
        });
    }


    var NewAttribute = function(data)
    {

      return $http.post("http://127.0.0.1:8831/DVP/API/6.0/ResourceManager/Attribute",data)
        .then(function (response) {

          console.log(response);
          return response;
        });
    }

    var getGroupList = function () {
      return $http.get("http://127.0.0.1:8831/DVP/API/6.0/ResourceManager/Groups")
        .then(function (response) {
          return response;
        });
    };

    var updateGroup = function (edtObj) {


      return $http.put("http://127.0.0.1:8831/DVP/API/6.0/ResourceManager/Group/" + edtObj.GroupId, edtObj)
        .then(function (response) {

          return response;
        });
    };

    var groupDelete = function (group) {

      return $http.delete("http://127.0.0.1:8831/DVP/API/6.0/ResourceManager/Group/"+group.GroupId)
        .then(function (response) {

          response.GroupId= group.GroupId;
          return response;
        });

    };

    var NewGroup = function(grpObj)
    {

      return $http.post("http://127.0.0.1:8831/DVP/API/6.0/ResourceManager/Group",grpObj)
        .then(function (response) {

          return response;
        });
    }

    var AddAttributesToGroup = function(AttributeIds,GID){

      var data ={
        OtherData:"Temp",
        AttributeIds:AttributeIds


      }
      return $http.put("http://127.0.0.1:8831/DVP/API/6.0/ResourceManager/Group/"+GID+"/Attribute",data)
        .then(function (response) {

          return response;
        });

    };



    var RemoveAttributeFromGroup = function (attributeId,groupId) {


      return $http.delete("http://127.0.0.1:8831/DVP/API/6.0//ResourceManager/Group/"+groupId+"/Attribute/"+attributeId)
        .then(function (response) {

          return response;
        });


    }

    var GetAttributesOfGroup = function (GrpID) {


      return $http.get("http://127.0.0.1:8831/DVP/API/6.0/ResourceManager/Group/"+GrpID+"/Attribute/Details")
        .then(function (response) {
          return response;
        });

    }



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


