/**
 * Created by Rajinda on 12/31/2015.
 */

var fileModule = angular.module("fileServiceModule", ["download"]);

fileModule.factory("clusterService", function ($http, download,AuthService,baseUrl) {



  var downloadFile = function (id, fileName) {
    $http({
      url: baseUrl+ "File/Download/" + id + "/" + fileName,
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

  var getFiles = function (pageNo) {
    return $http({
      method: 'get',
      url: baseUrl+ 'Files/20/'+pageNo,
      headers: {
        'authorization': AuthService.Token
      }
    }).then(function (response) {
      return response.data.Result;
    });
  };

  var getFilesCategoryID = function (categoryId,pageNo) {
    return $http({
      method: 'get',
      url: baseUrl+ 'FilesInfo/Category/'+categoryId+'/50/'+pageNo,
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
      url: baseUrl+'File/' + file.UniqueId,
      headers: {'authorization': AuthService.Token}
    }).then(function (response) {
      return response.data.IsSuccess;
    });
  };

  var getCatagories = function (token) {

    return $http.get(baseUrl+'FileCategories',
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
    GetFilesCategoryID:getFilesCategoryID,
    UploadUrl: baseUrl+ "File/Upload",
    File: {},
    Headers: {'Authorization':  AuthService.Token}
  }

});

