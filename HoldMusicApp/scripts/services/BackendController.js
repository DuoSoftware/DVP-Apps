/**
 * Created by Achintha on 12/29/2015.
 */
(function () {

  var EditProfileObj;
  var DeleteProfilename;
  var newDataObj;
  var viewDeactAppObj;

  var backendcontroller = function ($http) {

    var getHoldMusicList = function () {
      console.log("BACKENDCONTROLLER");
      return $http.get("http://queuemusic.104.131.67.21.xip.io/DVP/API/1.0.0.0/QueueMusic/Profiles")
        // return $http.get("http://queuemusic.104.131.67.21.xip.io/DVP/API/1.0.0.0/QueueMusic/Profiles")
        .then(function (response) {
          console.log("BACKENDCONTROLLER2  -"+ JSON.stringify(response));
          return response.data;
        });
    };


    var deleteMusicProfile = function (name) {

      console.log("deleteMusicProfile-- "+ name);
      // return $http.post("http://appregistry.104.131.67.21.xip.io/DVP/API/1.0.0.0/APPRegistry/Application/"+AppId+"/Activate/false")
      // return $http.post("http://192.168.0.88:8013/DVP/API/6.0/APPRegistry/Application/"+AppId+"/Activate/false")
      return $http.delete("http://queuemusic.104.131.67.21.xip.io/DVP/API/1.0.0.0/QueueMusic/Profile/"+name)
        ///
        // ('/DVP/API/:version/QueueMusic/Profile/:name'
        .then(function (response) {

          if(response.data && response.data.IsSuccess) {

            console.log("updateMusicProfile--  "+ JSON.stringify(response));
            return response.data.Result;


          }else{

            return {};
          }
        });

    };


    var updateMusicProfile = function (Attribute) {

      console.log("updateMusicProfile");
      console.log(Attribute.Name);
      console.log(Attribute);
      // return $http.put("http://192.168.0.88:8013/DVP/API/6.0/APPRegistry/Application/"+Attribute.id,Attribute)
      return $http.put("http://queuemusic.104.131.67.21.xip.io/DVP/API/1.0.0.0/QueueMusic/Profile/"+Attribute.Name,Attribute)
        //QueueMusic/Profile/
        .then(function (response) {

          if(response.data && response.data.IsSuccess) {

            console.log("updateMusicProfile--  "+ JSON.stringify(response));
            return response.data.Result;


          }else{
            console.log("updateMusicProfile --Errorrr");
            //return response.data.Exception;;
            return{};
          }

        });

    }

    var createNewMusicProfile = function (NewAppDataObj) {

      console.log("createNewMusicProfile");
      console.log("AAAAAAAAAAAA---"+JSON.stringify(NewAppDataObj));

      return $http.post("http://queuemusic.104.131.67.21.xip.io/DVP/API/1.0.0.0/QueueMusic/Profile",NewAppDataObj)
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


    return{
      getHoldMusicList:getHoldMusicList,
      updateMusicProfile:updateMusicProfile,
      createNewMusicProfile:createNewMusicProfile,
      deleteMusicProfile:deleteMusicProfile,
      DeleteProfilename:DeleteProfilename,
      EditProfileObj:EditProfileObj,
      newDataObj:newDataObj,
      viewDeactAppObj:viewDeactAppObj
    };
  };

  var module = angular.module("holdMusicApp");
  module.factory("backendcontroller",backendcontroller);
}());
