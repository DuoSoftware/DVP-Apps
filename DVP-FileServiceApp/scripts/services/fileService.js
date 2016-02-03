/**
 * Created by Rajinda on 12/31/2015.
 */

var fileModule = angular.module("fileServiceModule", ["download"]);

fileModule.factory("clusterService", function ($http, download) {



    var downloadFile = function (id,fileName) {


        download.fromDataURL("http://fileservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/FileService/File/Download/"+id+"/"+fileName, fileName);

       /* return $http.get("http://localhost:8081/DVP/API/6.0/FileService/File/Download/"+id).then(function (response) {

            if (response.data && response.data.IsSuccess) {

                return response.data;


            } else {

                return false;
            }


        });*/
    };

    var getFiles = function () {

        return $http({
            method: 'get',
            url: 'http://fileservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/FileService/Files',
            headers: {
                'authorization': '1#1'
            }
        }).then(function (response) {
            return response.data.Result;
        });

    };

    var deleteFile = function (file) {
        return $http({
            method: 'delete',
            url: 'http://fileservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/FileService/File/' + file.UniqueId,
            headers: {
                'authorization': '1#1'
            }
        }).then(function (response) {
            return response.data.IsSuccess;
        });
    };

  var getCatagories = function () {

    return $http.get('http://fileservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/FileService/File/Categories').then(function (response) {
      return response.data.Result;
    });

  };

    return {

        DownloadFile: downloadFile,
        GetFiles: getFiles,
        DeleteFile: deleteFile,
        GetCatagories:getCatagories,
        UploadUrl : "http://fileservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/FileService/File/Upload",
        File: {}


    }

});
