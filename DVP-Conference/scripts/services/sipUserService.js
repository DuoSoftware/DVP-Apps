/**
 * Created by a on 1/11/2016.
 */

var taskModule = angular.module("sipUserService", []);

taskModule.factory("sipuser", function($http){

  var getExtensions = function(){

    return $http.get("http://127.0.0.1:8086/DVP/API/6.0/SipUser/ExtensionsByCategory/Conference").then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }


    });
  }


  return{

    GetExtensions : getExtensions


  }


});
