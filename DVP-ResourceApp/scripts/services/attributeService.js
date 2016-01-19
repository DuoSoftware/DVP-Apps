/**
 * Created by a on 12/10/2015.
 **/

var attributeModule = angular.module("attributeService", []);

attributeModule.factory("attribute", function($http){




  var getAttributes = function(){



    return $http.get("http://127.0.0.1:8831/DVP/API/6.0/ResourceManager/Attributes").then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }


    });
  }

  var getTskAttributes = function(id){


    return $http.get("http://127.0.0.1:8831/DVP/API/6.0/ResourceManager/ResourceTask/" + id + "/Attributes").then(function(response) {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }

    });

  }

  var setTskAttributes = function(taskId, attrib){



    return $http.post("http://127.0.0.1:8831/DVP/API/6.0/ResourceManager/ResourceTask/" + taskId + "/Attribute/"+attrib.Attribute, attrib).then(function(response) {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;

      }else{

        return {};
      }

    });

  }


  var deleteAttributeToTask = function(id){

    return $http.delete("http://127.0.0.1:8831/DVP/API/6.0/ResourceManager/ResourceTaskAttribute/"+id).then(function(response) {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;

      }else{

        return {};
      }

    });



  }




  return{

    GetAttributes : getAttributes,
    GetTskAttributes: getTskAttributes,
    SetTskAttributes: setTskAttributes,
    DeleteAttributeToTask: deleteAttributeToTask

  }


});

