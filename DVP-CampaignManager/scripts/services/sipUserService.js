/**
 * Created by a on 1/11/2016.
 */

var taskModule = angular.module("sipUserService", []);

taskModule.factory("sipuser", function($http){

  var getExtensions = function(){

    return $http.get("http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/ExtensionsByCategory/Campaign").then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }


    });
  }


  var getSipUsers= function(){

    return $http.get("http://localhost:8086/DVP/API/1.0.0.0/SipUser/Users").then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }


    });
  }





  return{

    GetExtensions : getExtensions,
    GetSipUsers : getSipUsers


  }


});
