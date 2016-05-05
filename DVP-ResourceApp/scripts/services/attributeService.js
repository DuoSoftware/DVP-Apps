/**
 * Created by a on 12/10/2015.
 **/

var attributeModule = angular.module("attributeService", []);

attributeModule.factory("attribute", function($http){


  var authToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaW51c2hhZGNrIiwianRpIjoiMjViZjZmZTItZjZjNC00ZWJhLWFmODgtNmMxNjIxOTU4OGRiIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE4OTI0NDE2NzIsInRlbmFudCI6MSwiY29tcGFueSI6Mywic2NvcGUiOlt7InJlc291cmNlIjoiYWxsIiwiYWN0aW9ucyI6ImFsbCJ9XSwiaWF0IjoxNDYwNDM4MDcyfQ.aPoVPiTtoGFgnKmhdLBTzwTrQRTGWWliYujHP5NONqU';

  var getAttributes = function(){

    return $http({
      method: 'GET',
      url: "http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Attributes",
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


    /*return $http.get("http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Attributes").then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }


    });*/
  };

  var getTskAttributes = function(id){



    return $http({
      method: 'GET',
      url: "http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/ResourceTask/" + id + "/Attributes",
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



    /*return $http.get("http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/ResourceTask/" + id + "/Attributes").then(function(response) {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }

    });*/

  };

  var setTskAttributes = function(taskId, attrib){


    return $http({
      method: 'POST',
      url: "http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/ResourceTask/" + taskId + "/Attribute/"+attrib.Attribute,
      headers: {
        'authorization': authToken
      },
      data:attrib
    }).then(function(response)
    {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }

    });


    /*return $http.post("http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/ResourceTask/" + taskId + "/Attribute/"+attrib.Attribute, attrib).then(function(response) {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;

      }else{

        return {};
      }

    });*/

  }


  var deleteAttributeToTask = function(id){

    return $http({
      method: 'DELETE',
      url: "http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/ResourceTaskAttribute/"+id,
      headers: {
        'authorization': authToken
      },
      data:attrib
    }).then(function(response)
    {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }

    });


    /*return $http.delete("http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/ResourceTaskAttribute/"+id).then(function(response) {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;

      }else{

        return {};
      }

    });*/



  };




  return{

    GetAttributes : getAttributes,
    GetTskAttributes: getTskAttributes,
    SetTskAttributes: setTskAttributes,
    DeleteAttributeToTask: deleteAttributeToTask

  }


});

