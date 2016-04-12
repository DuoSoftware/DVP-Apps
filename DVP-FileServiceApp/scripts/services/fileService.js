/**
 * Created by Rajinda on 12/31/2015.
 */

var fileModule = angular.module("fileServiceModule", ["download"]);

fileModule.factory("clusterService", function ($http, download) {

  var getToken = function () {

    return $http({
      method: 'get',
      url: 'http://localhost:8827/DVP/AuthorizationToken'
    }).then(function (response) {
      // return response.data.Result;
      return response.data;
    });

<<<<<<< HEAD
  var authToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaW51c2hhZGNrIiwianRpIjoiMjViZjZmZTItZjZjNC00ZWJhLWFmODgtNmMxNjIxOTU4OGRiIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE4OTI0NDE2NzIsInRlbmFudCI6MSwiY29tcGFueSI6Mywic2NvcGUiOlt7InJlc291cmNlIjoiYWxsIiwiYWN0aW9ucyI6ImFsbCJ9XSwiaWF0IjoxNDYwNDM4MDcyfQ.aPoVPiTtoGFgnKmhdLBTzwTrQRTGWWliYujHP5NONqU';

  var downloadFile = function (id,fileName) {
=======
  };

  var downloadFile = function (id, fileName) {
>>>>>>> 997cdbdc1b64778914226441f4bc6547216491f7

    return getToken().then(function (response) {

<<<<<<< HEAD
        download.fromDataURL("http://fileservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/FileService/File/Download/"+id+"/"+fileName,{
          headers:{authorization:authToken}
        }, fileName);
=======
      // call file download
>>>>>>> 997cdbdc1b64778914226441f4bc6547216491f7

      $http({
        url: "http://localhost:8888/DVP/API/6.0/FileService/File/Download/" + id + "/" + fileName,
        method: "get",
        //data: json, //this is your json data string
        headers: {
          'Content-type': 'application/json',
          'authorization': response
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

    }, function (error) {
      console.info("GetToken err" + error);

    });




<<<<<<< HEAD
        return $http({
            method: 'get',
            url: 'http://fileservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/FileService/Files',
            headers: {
                'authorization': authToken
            }
        }).then(function (response) {
            return response.data.Result;
        });
=======
>>>>>>> 997cdbdc1b64778914226441f4bc6547216491f7

   // download.fromDataURL("http://campaignmanager.104.131.67.21.xip.io/DVP/API/6.0/FileService/File/Download/" + id + "/" + fileName, fileName);

<<<<<<< HEAD
    var deleteFile = function (file) {
        return $http({
            method: 'delete',
            url: 'http://fileservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/FileService/File/' + file.UniqueId,
            headers: {
                'authorization': authToken
            }
        }).then(function (response) {
            return response.data.IsSuccess;
        });
    };
=======
>>>>>>> 997cdbdc1b64778914226441f4bc6547216491f7

  };

  var getFiles = function () {

    return getToken().then(function (response) {
      return $http({
        method: 'get',
        url: 'http://localhost:8888/DVP/API/6.0/FileService/Files',
        headers: {
          'authorization': response
        }
      }).then(function (response) {
        return response.data.Result;
      });
    }, function (error) {
      console.info("GetToken err" + error);

<<<<<<< HEAD
    return $http.get('http://fileservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/FileService/File/Categories',{
      headers:{authorization:authToken}
    }).then(function (response) {
      return response.data.Result;
=======
>>>>>>> 997cdbdc1b64778914226441f4bc6547216491f7
    });

  };

  var deleteFile = function (file) {

    return getToken().then(function (response) {
      return $http({
        method: 'delete',
        url: 'http://localhost:8888/DVP/API/6.0/FileService/File/' + file.UniqueId,
        headers: {'authorization': response}
      }).then(function (response) {
        return response.data.IsSuccess;
      });

    }, function (error) {
      console.info("GetToken err" + error);

    });


  };

  var getCatagories = function (token) {
    /*
     return $http({
     method: 'get',
     url: 'http://localhost:8888/DVP/API/6.0/FileService/File/Categories',
     headers: {
     'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ3YXJ1bmFAZHVvc29mdHdhcmUuY29tIiwianRpIjoiYWZmZWU2MjAtM2QxZS00YzY5LWI3ZGQtYjJhMGEzNzc1N2U2Iiwic3ViIjoiOTI0YWVhZDEtOTBkOC00MGE5LTg3M2QtNDc5YzE1ODllYjU1IiwiZXhwIjoxNDYwNTQxMjgyLCJ0ZW5hbnQiOiI1IiwiY29tcGFueSI6IjEwIiwic2NvcGUiOlt7InJlc291cmNlIjoiZmlsZXNlcnZpY2UiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfV0sImlhdCI6MTQ1OTkzNjQ4Mn0.zGoXCyrxjXTPASYrrzB0Vifkpf4UqeIqkC67wAzsQ6Q'
     }
     }).then(function (response) {
     return response.data.Result;
     });
     */

    return getToken().then(function (response) {
      return $http.get('http://localhost:8888/DVP/API/6.0/FileService/FileCategories',
        {
          headers: {'authorization': response}
        }
      ).then(function (response) {

          return response.data.Result;
        });

    }, function (error) {
      console.info("GetToken err" + error);

    });


  };

  return {
    GetToken: getToken,
    DownloadFile: downloadFile,
    GetFiles: getFiles,
    DeleteFile: deleteFile,
    GetCatagories: getCatagories,
    UploadUrl: "http://localhost:8888/DVP/API/6.0/FileService/File/Upload",
    File: {},
    Headers: {}
  }

});


/*

fileModule.factory('fileFactory', ['$http', '$window',
  function ($http, $window) {
    return {
      downloadFile: function (id, fileName) {
        return $http(
          {
            method: "GET",
            data: fileId,
            url: "http://localhost:8888/DVP/API/6.0/FileService/File/Download/" + id + "/" + fileName,
            cache: false
          }).success(function (response) {
            var url = '/api/File/' + response.downloadId;
            $window.location = url;
          });
      }
    };
  }]);
*/
