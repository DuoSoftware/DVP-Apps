/**
 * Created by Achintha on 12/29/2015.
 */
(function () {

  var EditAppObj;
  var newDataObj;
  var viewDeactAppObj;

  var authToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaW51c2hhZGNrIiwianRpIjoiYjExYzg3YjktMzYyNS00ZWE0LWFlZWMtYzE0NGEwNjZlM2I5Iiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE4OTM2NTQyNzEsInRlbmFudCI6MSwiY29tcGFueSI6Mywic2NvcGUiOlt7InJlc291cmNlIjoiYWxsIiwiYWN0aW9ucyI6ImFsbCJ9XSwiaWF0IjoxNDYxNjUwNjcxfQ.j4zqaDSeuYIw5fy8AkiBTglyLpjV-Cucmlp1qdq9CfA';
  var backendcontroller = function ($http) {

    var getAppList = function () {
      console.log("BACKENDCONTROLLER");
      //   return $http.get("http://appregistry.104.131.67.21.xip.io/DVP/API/1.0.0.0/APPRegistry/Applications/true")
      // return $http.get("http://appregistry.104.131.78.57.xip.io/DVP/API/1.0.0.0/APPRegistry/Applications/true",
      return $http(
        {
          method: 'GET',
          url:"http://appregistry.104.131.67.21.xip.io/DVP/API/1.0.0.0/APPRegistry/Applications/true",
          headers:{
            'authorization':authToken
          }
          // data:NewAppDataObj
        }).then(function (response) {
          console.log("BACKENDCONTROLLER2");
          return response.data;
        });
    };

    /*  var assignMasterApp = function (NewAppDataObj) {
     console.log("assignMasterApp  "+NewAppDataObj.id+"  --  "+NewAppDataObj.MasterApplicationId);
     return $http.get("http://appregistry.104.131.67.21.xip.io/DVP/API/6.0/APPRegistry/Application/"+NewAppDataObj.id+"/SetAsMasterApp/"+NewAppDataObj.MasterApplicationId)

     //  return $http.get("http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/DidNumbers")
     .then(function (response) {
     //console.log("BACKENDCONTROLLER2");
     //return response.data;
     if(response.data && response.data.IsSuccess) {

     return response.data;


     }else{

     return {};
     }
     });
     };*/

    var getDeactiveAppList = function () {
      console.log("getDeactiveAppList");
      //return $http.get("http://appregistry.104.131.78.57.xip.io/DVP/API/1.0.0.0/APPRegistry/Applications/false",
      return $http(
        {
          method: 'GET',
          url:"http://appregistry.104.131.67.21.xip.io/DVP/API/1.0.0.0/APPRegistry/Applications/false",
          headers:{
            'authorization':authToken
          }
          // data:NewAppDataObj
        }).then(function (response) {
          //console.log("BACKENDCONTROLLER2");
          //return response.data;
          if(response.data && response.data.IsSuccess) {

            return response.data;


          }else{

            return {};
          }
        });
      //  return $http.get("http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/DidNumbers")

    };

    var deleteApplication = function (AppId) {

      // return $http.post("http://appregistry.104.131.67.21.xip.io/DVP/API/1.0.0.0/APPRegistry/Application/"+AppId+"/Activate/false")
      // return $http.post("http://appregistry.104.131.78.57.xip.io/DVP/API/1.0.0.0/APPRegistry/Application/"+AppId+"/Activate/false",
      return $http(
        {
          method: 'POST',
          url:"http://appregistry.104.131.67.21.xip.io/DVP/API/1.0.0.0/APPRegistry/Application/"+AppId+"/Activate/false",
          headers:{
            'authorization':authToken
          }
          // data:NewAppDataObj
        })
        .then(function (response) {

          if(response.data && response.data.IsSuccess) {

            return response.data.Result;


          }else{

            return {};
          }
        });

    };

    var activateApplication = function (AppId) {
      console.log("activateApplication-BACKENd");
      //   return $http.post("http://appregistry.104.131.78.57.xip.io/DVP/API/1.0.0.0/APPRegistry/Application/"+AppId+"/Activate/true",

      return $http(
        {
          method: 'POST',
          url:"http://appregistry.104.131.67.21.xip.io/DVP/API/1.0.0.0/APPRegistry/Application/"+AppId+"/Activate/true",
          headers:{
            'authorization':authToken
          }
          // data:NewAppDataObj
        })
        .then(function (response) {

          if(response.data && response.data.IsSuccess) {

            return response.data.Result;


          }else{

            return {};
          }
        });

    };

    var updateApp = function (Attribute) {

      console.log("updateApp");
      console.log(Attribute.id);
      console.log(Attribute);

      return $http(
        {
          method: 'PUT',
          url:"http://appregistry.104.131.67.21.xip.io/DVP/API/1.0.0.0/APPRegistry/Application/"+Attribute.id,
          headers:{
            'authorization':authToken
          },
          data:Attribute
        })
        .then(function (response) {

          if(response.data && response.data.IsSuccess) {

            return response.data.Result;


          }else{

            return {};
          }
          // console.log(Attribute.AttributeId);

          // return Attribute.AttributeId;
        });

    };

    var testApplication = function(appId){

      // return $http.get("http://appregistry.104.131.78.57.xip.io/DVP/API/1.0.0.0/APPRegistry/Application/"+appId+"/Test",
      return $http(
        {
          method: 'GET',
          url:"http://appregistry.104.131.67.21.xip.io/DVP/API/1.0.0.0/APPRegistry/Application/"+appId+"/Test",
          headers:{
            'authorization':authToken
          }
          // data:NewAppDataObj
        }).then(function(response){


          if(!response.data.IsSuccess && response.data.Exception ) {

            console.log("vbvbvb        "+JSON.stringify(response.data.Result));
            // console.log("AAAAAAAAAAAAAA   "+ JSON.stringify(response.data.Result));
            return response;

          }
          else{

            console.log("Status found "+response.data.Result);
            return response.data.Result;

          }


        });
    };

    var createNewApplication = function (NewAppDataObj) {

      console.log("createNewApplication");
      console.log(NewAppDataObj);
      //   console.log(Attribute);
      //   return $http.post("http://appregistry.104.131.67.21.xip.io/DVP/API/1.0.0.0/APPRegistry/Application",NewAppDataObj)
      // return $http.post("http://appregistry.104.131.78.57.xip.io/DVP/API/1.0.0.0/APPRegistry/Application",
      return $http(
        {
          method: 'POST',
          url:"http://appregistry.104.131.67.21.xip.io/DVP/API/1.0.0.0/APPRegistry/Application",
          headers:{
            'authorization':authToken
          },
          data:NewAppDataObj
        })
        .then(function (response) {
          if (response.data && response.data.IsSuccess) {

            console.log("BACKEND_SERVICE  "+JSON.stringify(response.data.Result));
            return response.data.Result;


          } else {

            console.log("BACKEND_SERVICE_ELSE  "+JSON.stringify(response.data.Exception));
            return response.data.Exception;
          }


        });
    };

    var getAllFiles = function(){
      return $http({
        method: 'GET',
        url: 'http://fileservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/FileService/Files',
        headers: {
          'authorization': authToken
        }})
        .then(function(response){
          return response.data;
        });
    };

    var getFilesByAppId = function(appId){
      return $http({
        method: 'GET',
        url: 'http://fileservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/FileService/Files/Info/'+appId,
        headers: {
          'authorization': authToken
        }})
        .then(function(response){
          return response.data;
        });
    };

    var assignFileToApp = function(uuid, appId){
      return $http({
        method: 'POST',
        url: 'http://fileservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/FileService/File/'+uuid+'/AssignToApplication/'+appId,
        headers: {
          'authorization': authToken
        }
      })
        .then(function(response){
          return response.data;
        });
    };

    var deleteFiles = function(uuid){
      return $http({
        method: 'POST',
        url: 'http://fileservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/FileService/File/'+uuid+'/DetachFromApplication',
        headers: {
          'authorization': authToken
        }})
        .then(function(response){
          return response.data;
        });
    };

    return{
      getAppList:getAppList,
      // attribDelete:attribDelete,
      updateApp:updateApp,
      // deleteAttribute:deleteAttribute,
      createNewApplication:createNewApplication,
      getDeactiveAppList:getDeactiveAppList,
      deleteApplication:deleteApplication,
      activateApplication:activateApplication,
      // assignMasterApp:assignMasterApp,
      testApplication:testApplication,
      EditAppObj:EditAppObj,
      newDataObj:newDataObj,
      viewDeactAppObj:viewDeactAppObj,
      getAllFiles:getAllFiles,
      getFilesByAppId:getFilesByAppId,
      assignFileToApp:assignFileToApp,
      deleteFiles:deleteFiles
    };
  };

  var module = angular.module("applicationDeveloperApp");
  module.factory("backendcontroller",backendcontroller);
}());
