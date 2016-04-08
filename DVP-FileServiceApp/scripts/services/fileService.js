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

  };

  var downloadFile = function (id, fileName) {

    $http({method: 'GET',
      headers: {
      'authorization': "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ3YXJ1bmFAZHVvc29mdHdhcmUuY29tIiwianRpIjoiYWZmZWU2MjAtM2QxZS00YzY5LWI3ZGQtYjJhMGEzNzc1N2U2Iiwic3ViIjoiOTI0YWVhZDEtOTBkOC00MGE5LTg3M2QtNDc5YzE1ODllYjU1IiwiZXhwIjoxNDYwNTQxMjgyLCJ0ZW5hbnQiOiI1IiwiY29tcGFueSI6IjEwIiwic2NvcGUiOlt7InJlc291cmNlIjoiZmlsZXNlcnZpY2UiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfV0sImlhdCI6MTQ1OTkzNjQ4Mn0.zGoXCyrxjXTPASYrrzB0Vifkpf4UqeIqkC67wAzsQ6Q"
    }, url: "http://localhost:8888/DVP/API/6.0/FileService/File/Download/" + id + "/" + fileName}).
      success(function(data, status, headers, config) {

        var anchor = angular.element('<a/>');
        anchor.attr({
          href: 'data:' +data,
          target: '_blank',
          download: fileName
        })[0].click();

     /*
        var anchor = angular.element('<a/>');
        anchor.attr({
          href: 'data:attachment/csv;charset=utf-8,' + encodeURI(data),
          target: '_blank',
          download: fileName
        })[0].click();
*/
      }).
      error(function(data, status, headers, config) {
        // handle error
      });

   // download.fromDataURL("http://campaignmanager.104.131.67.21.xip.io/DVP/API/6.0/FileService/File/Download/" + id + "/" + fileName, fileName);


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
