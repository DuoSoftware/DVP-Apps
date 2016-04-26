/**
 * Created by a on 1/26/2016.
 */

/**
 * Created by a on 1/22/2016.
 */


var numberModule = angular.module("phoneNumberService", []);

numberModule.factory("number", function($http){

  var getNumbers = function(){

    return $http({
      method: 'GET',
      url: "http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/TrunkNumbers",
      headers: {
        'authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaW51c2hhZGNrIiwianRpIjoiMjViZjZmZTItZjZjNC00ZWJhLWFmODgtNmMxNjIxOTU4OGRiIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE4OTI0NDE2NzIsInRlbmFudCI6MSwiY29tcGFueSI6Mywic2NvcGUiOlt7InJlc291cmNlIjoiYWxsIiwiYWN0aW9ucyI6ImFsbCJ9XSwiaWF0IjoxNDYwNDM4MDcyfQ.aPoVPiTtoGFgnKmhdLBTzwTrQRTGWWliYujHP5NONqU'
      }
    }).then(function(response)
    {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return [];
      }

    });


    /*return $http.get("http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/TrunkNumbers").then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return [];
      }


    });*/
  };






  return{

    GetNumbers : getNumbers


  }


});


