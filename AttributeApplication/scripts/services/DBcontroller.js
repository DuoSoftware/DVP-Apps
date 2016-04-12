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
        url: "http://resourceservice.45.55.189.191.xip.io/DVP/API/1.0.0.0/ResourceManager/Attributes",
        headers: {
          'authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQYXdhblNhc2Fua2EiLCJqdGkiOiI2OGZjNzkyYy04ZTVjLTRlZjktYTQ2OC0wMmM2NTlhMTczZTQiLCJzdWIiOiI1NmE5ZTc1OWZiMDcxOTA3YTAwMDAwMDEyNWQ5ZTgwYjVjN2M0Zjk4NDY2ZjkyMTE3OTZlYmY0MyIsImV4cCI6MTg5MjM1MzA3NywidGVuYW50IjoxLCJjb21wYW55Ijo0LCJzY29wZSI6W3sicmVzb3VyY2UiOiJhdHRyaWJ1dGUiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfV0sImlhdCI6MTQ2MDM0OTQ3N30.jgybM2m0BHgKaEuC3wfO2WtlC86Vilj0TrI8C6HEQt0'
        }
      }).then(function(response)
      {
        return response;
      });

    };



    var attribDelete = function (Attribute) {

      return $http({
        method: 'DELETE',
        url: "http://resourceservice.45.55.189.191.xip.io/DVP/API/1.0.0.0/ResourceManager/Attribute/"+Attribute.AttributeId,
        headers: {
          'authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQYXdhblNhc2Fua2EiLCJqdGkiOiI2OGZjNzkyYy04ZTVjLTRlZjktYTQ2OC0wMmM2NTlhMTczZTQiLCJzdWIiOiI1NmE5ZTc1OWZiMDcxOTA3YTAwMDAwMDEyNWQ5ZTgwYjVjN2M0Zjk4NDY2ZjkyMTE3OTZlYmY0MyIsImV4cCI6MTg5MjM1MzA3NywidGVuYW50IjoxLCJjb21wYW55Ijo0LCJzY29wZSI6W3sicmVzb3VyY2UiOiJhdHRyaWJ1dGUiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfV0sImlhdCI6MTQ2MDM0OTQ3N30.jgybM2m0BHgKaEuC3wfO2WtlC86Vilj0TrI8C6HEQt0'
        }
      }).then(function(response)
      {
        return response;
      });



    };

    var updateAttribute = function (edtObj) {


      return $http({
        method: 'PUT',
        url: "http://resourceservice.45.55.189.191.xip.io/DVP/API/1.0.0.0/ResourceManager/Attribute/"+edtObj.AttributeId,
        headers: {
          'authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQYXdhblNhc2Fua2EiLCJqdGkiOiI2OGZjNzkyYy04ZTVjLTRlZjktYTQ2OC0wMmM2NTlhMTczZTQiLCJzdWIiOiI1NmE5ZTc1OWZiMDcxOTA3YTAwMDAwMDEyNWQ5ZTgwYjVjN2M0Zjk4NDY2ZjkyMTE3OTZlYmY0MyIsImV4cCI6MTg5MjM1MzA3NywidGVuYW50IjoxLCJjb21wYW55Ijo0LCJzY29wZSI6W3sicmVzb3VyY2UiOiJhdHRyaWJ1dGUiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfV0sImlhdCI6MTQ2MDM0OTQ3N30.jgybM2m0BHgKaEuC3wfO2WtlC86Vilj0TrI8C6HEQt0'
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
        url: "http://resourceservice.45.55.189.191.xip.io/DVP/API/1.0.0.0/ResourceManager/Attribute",
        headers: {
          'authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQYXdhblNhc2Fua2EiLCJqdGkiOiI2OGZjNzkyYy04ZTVjLTRlZjktYTQ2OC0wMmM2NTlhMTczZTQiLCJzdWIiOiI1NmE5ZTc1OWZiMDcxOTA3YTAwMDAwMDEyNWQ5ZTgwYjVjN2M0Zjk4NDY2ZjkyMTE3OTZlYmY0MyIsImV4cCI6MTg5MjM1MzA3NywidGVuYW50IjoxLCJjb21wYW55Ijo0LCJzY29wZSI6W3sicmVzb3VyY2UiOiJhdHRyaWJ1dGUiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfV0sImlhdCI6MTQ2MDM0OTQ3N30.jgybM2m0BHgKaEuC3wfO2WtlC86Vilj0TrI8C6HEQt0'
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
        url: "http://resourceservice.45.55.189.191.xip.io/DVP/API/1.0.0.0/ResourceManager/Groups",
        headers: {
          'authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQYXdhblNhc2Fua2EiLCJqdGkiOiIyMTVkYWUyZS1kZWZmLTQ3NjItOTk4YS1lNDc0ODgyMDE3ZDEiLCJzdWIiOiI1NmE5ZTc1OWZiMDcxOTA3YTAwMDAwMDEyNWQ5ZTgwYjVjN2M0Zjk4NDY2ZjkyMTE3OTZlYmY0MyIsImV4cCI6MTg5MjM1MzI4MSwidGVuYW50IjoxLCJjb21wYW55Ijo0LCJzY29wZSI6W3sicmVzb3VyY2UiOiJncm91cCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19XSwiaWF0IjoxNDYwMzQ5NjgxfQ.WWF3Krwm_5www72L2tOdsH-LEXuMr94rQu6axKLI1E8'
        }
      }).then(function(response)
      {
        return response;
      });

    };

    var updateGroup = function (edtObj) {

      return $http({
        method: 'PUT',
        url: "http://resourceservice.45.55.189.191.xip.io/DVP/API/1.0.0.0/ResourceManager/Group/" + edtObj.GroupId,
        headers: {
          'authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQYXdhblNhc2Fua2EiLCJqdGkiOiIyMTVkYWUyZS1kZWZmLTQ3NjItOTk4YS1lNDc0ODgyMDE3ZDEiLCJzdWIiOiI1NmE5ZTc1OWZiMDcxOTA3YTAwMDAwMDEyNWQ5ZTgwYjVjN2M0Zjk4NDY2ZjkyMTE3OTZlYmY0MyIsImV4cCI6MTg5MjM1MzI4MSwidGVuYW50IjoxLCJjb21wYW55Ijo0LCJzY29wZSI6W3sicmVzb3VyY2UiOiJncm91cCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19XSwiaWF0IjoxNDYwMzQ5NjgxfQ.WWF3Krwm_5www72L2tOdsH-LEXuMr94rQu6axKLI1E8'
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
        url: "http://resourceservice.45.55.189.191.xip.io/DVP/API/1.0.0.0/ResourceManager/Group/"+group.GroupId,
        headers: {
          'authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQYXdhblNhc2Fua2EiLCJqdGkiOiIyMTVkYWUyZS1kZWZmLTQ3NjItOTk4YS1lNDc0ODgyMDE3ZDEiLCJzdWIiOiI1NmE5ZTc1OWZiMDcxOTA3YTAwMDAwMDEyNWQ5ZTgwYjVjN2M0Zjk4NDY2ZjkyMTE3OTZlYmY0MyIsImV4cCI6MTg5MjM1MzI4MSwidGVuYW50IjoxLCJjb21wYW55Ijo0LCJzY29wZSI6W3sicmVzb3VyY2UiOiJncm91cCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19XSwiaWF0IjoxNDYwMzQ5NjgxfQ.WWF3Krwm_5www72L2tOdsH-LEXuMr94rQu6axKLI1E8'
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
        url: "http://resourceservice.45.55.189.191.xip.io/DVP/API/1.0.0.0/ResourceManager/Group",
        headers: {
          'authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQYXdhblNhc2Fua2EiLCJqdGkiOiIyMTVkYWUyZS1kZWZmLTQ3NjItOTk4YS1lNDc0ODgyMDE3ZDEiLCJzdWIiOiI1NmE5ZTc1OWZiMDcxOTA3YTAwMDAwMDEyNWQ5ZTgwYjVjN2M0Zjk4NDY2ZjkyMTE3OTZlYmY0MyIsImV4cCI6MTg5MjM1MzI4MSwidGVuYW50IjoxLCJjb21wYW55Ijo0LCJzY29wZSI6W3sicmVzb3VyY2UiOiJncm91cCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19XSwiaWF0IjoxNDYwMzQ5NjgxfQ.WWF3Krwm_5www72L2tOdsH-LEXuMr94rQu6axKLI1E8'
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
        url: "http://resourceservice.45.55.189.191.xip.io/DVP/API/1.0.0.0/ResourceManager/Group/"+GID+"/Attribute",
        headers: {
          'authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQYXdhblNhc2Fua2EiLCJqdGkiOiIyMTVkYWUyZS1kZWZmLTQ3NjItOTk4YS1lNDc0ODgyMDE3ZDEiLCJzdWIiOiI1NmE5ZTc1OWZiMDcxOTA3YTAwMDAwMDEyNWQ5ZTgwYjVjN2M0Zjk4NDY2ZjkyMTE3OTZlYmY0MyIsImV4cCI6MTg5MjM1MzI4MSwidGVuYW50IjoxLCJjb21wYW55Ijo0LCJzY29wZSI6W3sicmVzb3VyY2UiOiJncm91cCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19XSwiaWF0IjoxNDYwMzQ5NjgxfQ.WWF3Krwm_5www72L2tOdsH-LEXuMr94rQu6axKLI1E8'
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
        url: "http://resourceservice.45.55.189.191.xip.io/DVP/API/1.0.0.0/ResourceManager/Group/"+groupId+"/Attribute/"+attributeId,
        headers: {
          'authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQYXdhblNhc2Fua2EiLCJqdGkiOiIyMTVkYWUyZS1kZWZmLTQ3NjItOTk4YS1lNDc0ODgyMDE3ZDEiLCJzdWIiOiI1NmE5ZTc1OWZiMDcxOTA3YTAwMDAwMDEyNWQ5ZTgwYjVjN2M0Zjk4NDY2ZjkyMTE3OTZlYmY0MyIsImV4cCI6MTg5MjM1MzI4MSwidGVuYW50IjoxLCJjb21wYW55Ijo0LCJzY29wZSI6W3sicmVzb3VyY2UiOiJncm91cCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19XSwiaWF0IjoxNDYwMzQ5NjgxfQ.WWF3Krwm_5www72L2tOdsH-LEXuMr94rQu6axKLI1E8'
        }
      }).then(function(response)
      {
        return response;
      });


    };

    var GetAttributesOfGroup = function (GrpID) {

      return $http({
        method: 'GET',
        url: "http://resourceservice.45.55.189.191.xip.io/DVP/API/1.0.0.0/ResourceManager/Group/"+GrpID+"/Attribute/Details",
        headers: {
          'authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQYXdhblNhc2Fua2EiLCJqdGkiOiIyMTVkYWUyZS1kZWZmLTQ3NjItOTk4YS1lNDc0ODgyMDE3ZDEiLCJzdWIiOiI1NmE5ZTc1OWZiMDcxOTA3YTAwMDAwMDEyNWQ5ZTgwYjVjN2M0Zjk4NDY2ZjkyMTE3OTZlYmY0MyIsImV4cCI6MTg5MjM1MzI4MSwidGVuYW50IjoxLCJjb21wYW55Ijo0LCJzY29wZSI6W3sicmVzb3VyY2UiOiJncm91cCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19XSwiaWF0IjoxNDYwMzQ5NjgxfQ.WWF3Krwm_5www72L2tOdsH-LEXuMr94rQu6axKLI1E8'
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


