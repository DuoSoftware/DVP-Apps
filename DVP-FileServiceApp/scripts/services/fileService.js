/**
 * Created by Rajinda on 12/31/2015.
 */

var fileModule = angular.module("fileServiceModule", ["download"]);

fileModule.factory("clusterService", function ($http, download,AuthService,baseUrl) {



  var downloadFile = function (id, fileName) {

    $http({
      url: "http://fileservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/FileService/File/Download/" + id + "/" + fileName,
      method: "get",
      //data: json, //this is your json data string
      headers: {
        'Content-type': 'application/json',
        'authorization': AuthService.Token
      },
      responseType: 'arraybuffer'
    }).success(function (data, status, headers, config) {

      /*
       var blob = new Blob([data], {type: "application/image/png"});
       var objectUrl = URL.createObjectURL(blob);
       window.open(objectUrl);
       */

      var myBlob = new Blob([data]);
      var blobURL = (window.URL || window.webkitURL).createObjectURL(myBlob);
      var anchor = document.createElement("a");
      anchor.download = fileName;
      anchor.href = blobURL;
      anchor.click();

    }).error(function (data, status, headers, config) {
      //upload failed
    });

  };

  var getFiles = function () {
    return $http({
      method: 'get',
      url: 'http://fileservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/FileService/Files',
      headers: {
        'authorization': AuthService.Token
      }
    }).then(function (response) {
      return response.data.Result;
    });
  };

  var deleteFile = function (file) {
    return $http({
      method: 'delete',
      url: 'http://fileservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/FileService/File/' + file.UniqueId,
      headers: {'authorization': AuthService.Token}
    }).then(function (response) {
      return response.data.IsSuccess;
    });
  };

  var getCatagories = function (token) {

    return $http.get('http://fileservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/FileService/FileCategories',
      {
        headers: {'authorization':  AuthService.Token}
      }
    ).then(function (response) {

        return response.data.Result;
      });

  };

  return {
    GetToken: AuthService.Token,
    DownloadFile: downloadFile,
    GetFiles: getFiles,
    DeleteFile: deleteFile,
    GetCatagories: getCatagories,
    UploadUrl: "http://fileservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/FileService/File/Upload",
    File: {},
    Headers: {'Authorization':  AuthService.Token}
  }

});

