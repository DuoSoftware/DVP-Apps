/**
 * Created by a on 1/26/2016.
 */

/**
 * Created by a on 1/22/2016.
 */


var numberModule = angular.module("phoneNumberService", []);

numberModule.factory("number", function($http){

  var getNumbers = function(){

    return $http.get("http://localhost:9898/DVP/API/1.0.0.0/PhoneNumberTrunkApi/TrunkNumbers").then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return [];
      }


    });
  }






  return{

    GetNumbers : getNumbers


  }


});


