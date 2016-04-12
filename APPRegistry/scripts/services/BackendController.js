/**
 * Created by Achintha on 12/29/2015.
 */
(function () {

    var EditAppObj;
    var newDataObj;
    var viewDeactAppObj;

  var authToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaW51c2hhZGNrIiwianRpIjoiMjViZjZmZTItZjZjNC00ZWJhLWFmODgtNmMxNjIxOTU4OGRiIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE4OTI0NDE2NzIsInRlbmFudCI6MSwiY29tcGFueSI6Mywic2NvcGUiOlt7InJlc291cmNlIjoiYWxsIiwiYWN0aW9ucyI6ImFsbCJ9XSwiaWF0IjoxNDYwNDM4MDcyfQ.aPoVPiTtoGFgnKmhdLBTzwTrQRTGWWliYujHP5NONqU';
    var backendcontroller = function ($http) {

        var getAppList = function () {
            console.log("BACKENDCONTROLLER");
           // return $http.get("http://appregistry.104.131.67.21.xip.io/DVP/API/1.0.0.0/APPRegistry/Applications/true")
                  return $http.get("http://appregistry.104.131.67.21.xip.io/DVP/API/6.0/APPRegistry/Applications/true",
                    {
                      headers:{authorization:authToken}
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
            return $http.get("http://appregistry.104.131.67.21.xip.io/DVP/API/1.0.0.0/APPRegistry/Applications/false",
              {
                headers:{authorization:authToken}
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
          return $http.post("http://appregistry.104.131.67.21.xip.io/DVP/API/6.0/APPRegistry/Application/"+AppId+"/Activate/false",
            {
              headers:{authorization:authToken}
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
            return $http.post("http://appregistry.104.131.67.21.xip.io/DVP/API/1.0.0.0/APPRegistry/Application/"+AppId+"/Activate/true",
              {
                headers:{authorization:authToken}
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
            return $http.put("http://appregistry.104.131.67.21.xip.io/DVP/API/6.0/APPRegistry/Application/"+Attribute.id,
              {
                headers:{authorization:authToken}
              },Attribute)
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

            return $http.get("http://appregistry.104.131.67.21.xip.io/DVP/API/6.0/APPRegistry/Application/"+appId+"/Test",
              {
                headers:{authorization:authToken}
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
          //   console.log(Attribute);
          //   return $http.post("http://appregistry.104.131.67.21.xip.io/DVP/API/1.0.0.0/APPRegistry/Application",NewAppDataObj)
          return $http.post("http://appregistry.104.131.67.21.xip.io/DVP/API/6.0/APPRegistry/Application",
            {
              headers:{authorization:authToken}
            }, NewAppDataObj)

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
            viewDeactAppObj:viewDeactAppObj
        };
    };

    var module = angular.module("applicationDeveloperApp");
    module.factory("backendcontroller",backendcontroller);
}());
