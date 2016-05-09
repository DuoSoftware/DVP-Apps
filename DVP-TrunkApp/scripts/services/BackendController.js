/**
 * Created by Achintha on 12/29/2015.
 */
(function () {

  var EditTrunkObj;
  var DeleteProfilename;
  var newDataObj;
  var viewDeactAppObj;
  var newTunkId;
  var editTrunkId;

  var backendcontroller = function ($http) {

    var authToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaW51c2hhZGNrIiwianRpIjoiYjExYzg3YjktMzYyNS00ZWE0LWFlZWMtYzE0NGEwNjZlM2I5Iiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE4OTM2NTQyNzEsInRlbmFudCI6MSwiY29tcGFueSI6Mywic2NvcGUiOlt7InJlc291cmNlIjoiYWxsIiwiYWN0aW9ucyI6ImFsbCJ9XSwiaWF0IjoxNDYxNjUwNjcxfQ.j4zqaDSeuYIw5fy8AkiBTglyLpjV-Cucmlp1qdq9CfA';

    var getLimits = function(){
      console.log("BACKENDCONTROLLER - getLimits ");
      return $http.get("http://limithandler.104.131.67.21.xip.io/DVP/API/1.0.0.0/LimitAPI/Limit/Info",{
        headers:{authorization:authToken}
      })
        // return $http.get("http://queuemusic.104.131.67.21.xip.io/DVP/API/1.0.0.0/QueueMusic/Profiles")
        .then(function (response) {
          console.log("BACKENDCONTROLLER-getTrunkList -"+ JSON.stringify(response));
          return response.data;
        });
    };

    var createNewTrunk= function (createNewTrunk) {

      console.log("createNewTrunk");
      console.log("createNewTrunk---"+JSON.stringify(createNewTrunk));

      return $http.post("http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/Trunk",createNewTrunk,{
        headers:{authorization:authToken}
      })
        .then(function (response) {
          if (response.data && response.data.IsSuccess) {

            console.log("BACKEND_SERVICE  "+JSON.stringify(response.data.Result));
            return response.data.Result;


          } else {

            console.log("BACKEND_SERVICE_ELSE  "+JSON.stringify(response.data));
            // console.log("BACKEND_SERVICE_ELSE SSSSS "+JSON.stringify(response.data.Result.errors.message));
            //return response.data.Result.errors;
            return{};
          }


        });
    }

    var getTrunkList = function () {
      console.log("BACKENDCONTROLLER - getTrunkList ");
      return $http.get("http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/Trunks",{
        headers:{authorization:authToken}
      })
        // return $http.get("http://queuemusic.104.131.67.21.xip.io/DVP/API/1.0.0.0/QueueMusic/Profiles")
        .then(function (response) {
          console.log("BACKENDCONTROLLER-getTrunkList -"+ JSON.stringify(response));
          return response.data;
        });
    };

    var getProfileData = function($http){
      console.log("BACKENDCONTROLLER - getProfileData ");
      return $http.get("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/Profiles",{
        headers:{authorization:authToken}
      })
        .then(function (response) {
          if(response.data && response.data.IsSuccess) {
            console.log("BACKENDCONTROLLER - getProfileData "+ JSON.stringify(response));
            return response.data.Result;
          }
          else{
            return {};
          }
        });
    };

    var getCloudeData = function($http){
      console.log("BACKENDCONTROLLER - getCloudeData ");
      return $http.get("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/Clouds",{
        headers:{authorization:authToken}
      })
        .then(function (response) {
          if(response.data && response.data.IsSuccess) {
            console.log("BACKENDCONTROLLER - getCloudeData "+ JSON.stringify(response));
            return response.data.Result;
          }
          else{
            return {};
          }
        });
    };

    var deleteTrunk = function (id) {

      console.log("deleteTrunk-- "+ id);
      // return $http.post("http://appregistry.104.131.67.21.xip.io/DVP/API/1.0.0.0/APPRegistry/Application/"+AppId+"/Activate/false")
      // return $http.post("http://192.168.0.88:8013/DVP/API/6.0/APPRegistry/Application/"+AppId+"/Activate/false")

     /* return $http.post("http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/Trunk/"+id+"/Availability/false",{
        headers:{authorization:authToken}
      })
      */
      return $http(
        {
          method: 'POST',
          url:"http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/Trunk/"+id+"/Availability/false",
          headers:{
            'authorization':authToken
          }
          // data:NewAppDataObj
        })
        .then(function (response) {

          if(response.data && response.data.IsSuccess) {

            console.log("updateMusicProfile--  "+ JSON.stringify(response));
            return response.data.IsSuccess;


          }else{

            return {};
          }
        });

    };

    var deleteNumber = function (phoneNumber) {

      console.log("deleteNumber-- "+ phoneNumber);
  /*    return $http.delete("http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/TrunkNumber/"+phoneNumber,{
        headers:{authorization:authToken}
      })*/

      return $http(
        {
          method: 'DELETE',
          url:"http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/TrunkNumber/"+phoneNumber,
          headers:{
            'authorization':authToken
          }
          // data:NewAppDataObj
        })
        .then(function (response) {

          if(response.data && response.data.IsSuccess) {

            console.log("updateMusicProfile--  "+ JSON.stringify(response));
            return response.data.IsSuccess;


          }else{

            return {};
          }
        });

    };


    var createNewNumber= function (createNewNumber) {

      console.log("createNewNumber");
      console.log("createNewNumber---"+JSON.stringify(createNewNumber));

   /*   return $http.post("http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/TrunkNumber",{
        headers:{authorization:authToken}
      },createNewNumber)

*/
      return $http(
        {
          method: 'POST',
          url:"http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/TrunkNumber",
          headers:{
            'authorization':authToken
          },
           data:createNewNumber
        })
        .then(function (response) {
          if (response.data && response.data.IsSuccess) {

            console.log("BACKEND_SERVICE  "+JSON.stringify(response.data.Result));
            return response.data.IsSuccess;


          } else {

            console.log("BACKEND_SERVICE_ELSE  "+JSON.stringify(response.data));
            // console.log("BACKEND_SERVICE_ELSE SSSSS "+JSON.stringify(response.data.Result.errors.message));
            //return response.data.Result.errors;
            return{};
          }


        });
    };

    var updateNumber= function (editNumber) {

      console.log("updateNumber");
      console.log("updateNumber---"+JSON.stringify(editNumber));
/*
      return $http.post("http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/TrunkNumber/"+editNumber.PhoneNumber,{
        headers:{authorization:authToken}
      },editNumber)*/
        //PhoneNumberTrunkApi/TrunkNumber/

      return $http(
        {
          method: 'POST',
          url:"http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/TrunkNumber/"+editNumber.PhoneNumber,
          headers:{
            'authorization':authToken
          }
          // data:NewAppDataObj
        })
        .then(function (response) {
          if (response.data && response.data.IsSuccess) {

            console.log("BACKEND_SERVICE  "+JSON.stringify(response.data.Result));
            return response.data.IsSuccess;


          } else {

            console.log("BACKEND_SERVICE_ELSE  "+JSON.stringify(response.data));
            // console.log("BACKEND_SERVICE_ELSE SSSSS "+JSON.stringify(response.data.Result.errors.message));
            //return response.data.Result.errors;
            return{};
          }


        });
    }

    var updateTrunk= function (EditTrunkDataObj) {

      console.log("updateTrunk");
      console.log("updateTrunk---"+JSON.stringify(EditTrunkDataObj));

   /*   return $http.post("http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/Trunk/"+EditTrunkDataObj.id ,{
        headers:{authorization:authToken}
      },EditTrunkDataObj)
*/
      return $http(
        {
          method: 'POST',
          url:"http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/Trunk/"+EditTrunkDataObj.id ,
          headers:{
            'authorization':authToken
          }
          // data:NewAppDataObj
        })

        .then(function (response) {
          if (response.data && response.data.IsSuccess) {

            console.log("BACKEND_SERVICE  "+JSON.stringify(response.data.Result));
            return response.data.IsSuccess;


          } else {

            console.log("BACKEND_SERVICE_ELSE  "+JSON.stringify(response.data));
            // console.log("BACKEND_SERVICE_ELSE SSSSS "+JSON.stringify(response.data.Result.errors.message));
            //return response.data.Result.errors;
            return{};
          }


        });
    };

    var getProfileData = function(){
      console.log("BACKENDCONTROLLER - getProfileData ");
      return $http.get("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/Profiles",{
        headers:{authorization:authToken}
      })
        .then(function (response) {
          if(response.data && response.data.IsSuccess) {
            console.log("BACKENDCONTROLLER - getProfileData "+ JSON.stringify(response.data.Result));
            return response.data.Result;
          }
          else{
            return {};
          }
        });
    };

    var getCloudeData = function(){
      console.log("BACKENDCONTROLLER - getCloudeData ");
      return $http.get("http://clusterconfig.104.131.67.21.xip.io/DVP/API/1.0.0.0/CloudConfiguration/Clouds",{
        headers:{authorization:authToken}
      })
        .then(function (response) {
          //console.log("getCloudeData----"+JSON.stringify(response));
          if(response.data && response.data.IsSuccess) {
            console.log("BACKENDCONTROLLER - getCloudeData "+ JSON.stringify(response.data.Result));
            return response.data.Result;
          }
          else{
            return {};
          }
        });
    };

    var getNumberTranslationData = function(){
      console.log("BACKENDCONTROLLER - getNumberTranslationData ");
      return $http.get("http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/Translations",{
        headers:{authorization:authToken}
      })
        .then(function (response) {
          if(response.data && response.data.IsSuccess) {
            console.log("BACKENDCONTROLLER - getNumberTranslationData "+ JSON.stringify(response.data.Result));
            return response.data.Result;
          }
          else{
            return {};
          }
        });
    };

    var setExternalProfileOnTrunk = function(trunkId,profID){
      console.log("BACKENDCONTROLLER - setExternalProfileOnTrunk "+trunkId+"---"+profID);

     // return {};
  /*    return $http.post("http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/Trunk/"+trunkId+"/SetSipProfile/"+profID,{
        headers:{authorization:authToken}
      })
*/
      return $http(
        {
          method: 'POST',
          url:"http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/Trunk/"+trunkId+"/SetSipProfile/"+profID,
          headers:{
            'authorization':authToken
          }
          // data:NewAppDataObj
        })
       // /DVP/API/1.0.0.0/PhoneNumberTrunkApi/Trunk/:id/SetSipProfile/:profId
        .then(function (response) {
          if(response.data && response.data.IsSuccess) {
            console.log("BACKENDCONTROLLER - getNumberTranslationData "+ JSON.stringify(response.data.Result));
            return response.data.IsSuccess;
          }
          else{
            return {};
          }
        });
    }

    var setCloudeOnTrunk = function(trunkId,cloudeID){
      console.log("BACKENDCONTROLLER - setCloudeOnTrunk ");
      console.log("BACKENDCONTROLLER -"+trunkId+"--"+cloudeID);
/*
      return $http.post("http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/Trunk/"+trunkId+"/SetCloud/"+cloudeID,{
        headers:{authorization:authToken}
      })*/

      return $http(
        {
          ///DVP/API/' + hostVersion + '/PhoneNumberTrunkApi/Trunk/:id/SetCloud/:cloudId
          method: 'POST',
          url:"http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/Trunk/"+trunkId+"/SetCloud/"+cloudeID,
          headers:{
            'authorization':authToken
          }
          // data:NewAppDataObj
        })
      // /DVP/API/1.0.0.0/PhoneNumberTrunkApi/Trunk/:id/SetSipProfile/:profId
      .then(function (response) {
        if(response.data && response.data.IsSuccess) {
          console.log("BACKENDCONTROLLER - setCloudeOnTrunk_result "+JSON.stringify(response.data));
          //console.log("BACKENDCONTROLLER - setCloudeOnTrunk_result "+ JSON.stringify(response.data));
          return response.data.IsSuccess;
        }
        else{
          return {};
        }
      });
    }

    var setNumberTranslationOnTrunk = function(trunkId,TransID){
      console.log("BACKENDCONTROLLER - setNumberTranslationOnTrunk ");
/*
         return $http.post("http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/Trunk/"+trunkId+"/SetTranslation/"+TransID,{
           headers:{authorization:authToken}
         })
*/
      return $http(
        {
          method: 'POST',
          url:"http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/Trunk/"+trunkId+"/SetTranslation/"+TransID,
          headers:{
            'authorization':authToken
          }
          // data:NewAppDataObj
        })
       // /DVP/API/1.0.0.0/PhoneNumberTrunkApi/Trunk/:id/SetSipProfile/:profId
       .then(function (response) {
       if(response.data && response.data.IsSuccess) {
       console.log("BACKENDCONTROLLER - getNumberTranslationData "+ JSON.stringify(response.data.Result));
       return response.data.IsSuccess;
       }
       else{
       return {};
       }
       });
    }


    var setInboundLimitOnNumber = function(number,LimitID){
      console.log("BACKENDCONTROLLER - setBothLimitOnNumber ");

 /*     return $http.post("http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/TrunkNumber/"+number+"/SetInboundLimit/"+LimitID,{
        headers:{authorization:authToken}
      })*/
//PhoneNumberTrunkApi/TrunkNumber/:trNum/SetBothLimit/:limId
        // /DVP/API/1.0.0.0/PhoneNumberTrunkApi/Trunk/:id/SetSipProfile/:profId

      return $http(
        {
          method: 'POST',
          url:"http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/TrunkNumber/"+number+"/SetInboundLimit/"+LimitID,
          headers:{
            'authorization':authToken
          }
          // data:NewAppDataObj
        })
        .then(function (response) {
          if(response.data && response.data.IsSuccess) {
            console.log("BACKENDCONTROLLER - getNumberTranslationData "+ JSON.stringify(response.data.Result));
            return response.data.IsSuccess;
          }
          else{
            return {};
          }
        });
    }
    var setOutboundLimitOnNumber = function(number,LimitID){
      console.log("BACKENDCONTROLLER - setBothLimitOnNumber ");

  /*    return $http.post("http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/TrunkNumber/"+number+"/SetOutboundLimit/"+LimitID,{
        headers:{authorization:authToken}
      })*/
//PhoneNumberTrunkApi/TrunkNumber/:trNum/SetBothLimit/:limId
        // /DVP/API/1.0.0.0/PhoneNumberTrunkApi/Trunk/:id/SetSipProfile/:profId

      return $http(
        {
          method: 'POST',
          url:"http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/TrunkNumber/"+number+"/SetOutboundLimit/"+LimitID,
          headers:{
            'authorization':authToken
          }
          // data:NewAppDataObj
        })
        .then(function (response) {
          if(response.data && response.data.IsSuccess) {
            console.log("BACKENDCONTROLLER - getNumberTranslationData "+ JSON.stringify(response.data.Result));
            return response.data.IsSuccess;
          }
          else{
            return {};
          }
        });
    }

    var setBothLimitOnNumber = function(number,LimitID){
      console.log("BACKENDCONTROLLER - setBothLimitOnNumber ");
/*
        return $http.post("http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/TrunkNumber/"+number+"/SetBothLimit/"+LimitID,{
          headers:{authorization:authToken}
        })*/
//PhoneNumberTrunkApi/TrunkNumber/:trNum/SetBothLimit/:limId
       // /DVP/API/1.0.0.0/PhoneNumberTrunkApi/Trunk/:id/SetSipProfile/:profId

      return $http(
        {
          method: 'POST',
          url:"http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/TrunkNumber/"+number+"/SetBothLimit/"+LimitID,
          headers:{
            'authorization':authToken
          }
          // data:NewAppDataObj
        })
       .then(function (response) {
       if(response.data && response.data.IsSuccess) {
       console.log("BACKENDCONTROLLER - getNumberTranslationData "+ JSON.stringify(response.data.Result));
       return response.data.IsSuccess;
       }
       else{
       return {};
       }
       });
    }

    var getTrunkDataById = function (id) {
      console.log("BACKENDCONTROLLER - getTrunkDataById ");
      return $http.get("http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/Trunk/"+id,{
        headers:{authorization:authToken}
      })
        // return $http.get("http://queuemusic.104.131.67.21.xip.io/DVP/API/1.0.0.0/QueueMusic/Profiles")
        .then(function (response) {
          console.log("BACKENDCONTROLLER-getNumberList -"+ JSON.stringify(response));
          return response.data;
        });
    };

    var getPhoneNumberList = function () {
      console.log("BACKENDCONTROLLER - getNumberList ");
      return $http.get("http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/TrunkNumbers",{
        headers:{authorization:authToken}
      })
        // return $http.get("http://queuemusic.104.131.67.21.xip.io/DVP/API/1.0.0.0/QueueMusic/Profiles")
        .then(function (response) {
          console.log("BACKENDCONTROLLER-getNumberList -"+ JSON.stringify(response));
          return response.data;
        });
    };

    var getPhoneNumbersOfTrunk = function (trunkId) {
      console.log("BACKENDCONTROLLER - getPhoneNumbersOfTrunk ");
      return $http.get("http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/Trunk/"+trunkId+"/PhoneNumbers",{
        headers:{authorization:authToken}
      })
        //PhoneNumberTrunkApi/Trunk/:id/PhoneNumbers
        // return $http.get("http://queuemusic.104.131.67.21.xip.io/DVP/API/1.0.0.0/QueueMusic/Profiles")
        .then(function (response) {
          console.log("BACKENDCONTROLLER-getPhoneNumbersOfTrunk -"+ JSON.stringify(response));
          return response.data;
        });
    };

    var getPhonenumberData = function (phoneNumber) {
      console.log("BACKENDCONTROLLER - getPhonenumberData ");
      return $http.get("http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/TrunkNumber/"+phoneNumber,{
        headers:{authorization:authToken}
      })
        .then(function (response) {
          console.log("BACKENDCONTROLLER-getPhonenumberData -"+ JSON.stringify(response));
          return response.data;
        });
    };

    return{
      deleteNumber:deleteNumber,
      updateNumber:updateNumber,
      getPhonenumberData:getPhonenumberData,
      getPhoneNumbersOfTrunk:getPhoneNumbersOfTrunk,
      setInboundLimitOnNumber:setInboundLimitOnNumber,
      setOutboundLimitOnNumber:setOutboundLimitOnNumber,
      setBothLimitOnNumber:setBothLimitOnNumber,
      getLimits:getLimits,
      getTrunkList:getTrunkList,
      getTrunkDataById:getTrunkDataById,
      createNewNumber:createNewNumber,
      createNewTrunk:createNewTrunk,
      updateTrunk:updateTrunk,
      getProfileData:getProfileData,
      getCloudeData:getCloudeData,
      getNumberTranslationData:getNumberTranslationData,
      setCloudeOnTrunk:setCloudeOnTrunk,
      setExternalProfileOnTrunk:setExternalProfileOnTrunk,
      setNumberTranslationOnTrunk:setNumberTranslationOnTrunk,
      getPhoneNumberList:getPhoneNumberList,
      newTunkId:newTunkId,
      deleteTrunk:deleteTrunk,
      EditTrunkObj:EditTrunkObj,
      newDataObj:newDataObj,
      viewDeactAppObj:viewDeactAppObj
    };
  };

  var module = angular.module("trunkApp");
  module.factory("backendcontroller",backendcontroller);
}());
