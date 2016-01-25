/**
 * Created by Rajinda on 12/31/2015.
 */

var fileModule = angular.module("fileServiceModule", ["download"]);

fileModule.factory("clusterService", function ($http, download) {



    var downloadFile = function (id,fileName) {


        download.fromDataURL("http://localhost:8081/DVP/API/6.0/FileService/File/Download/"+id, fileName);

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
            url: 'http://localhost:8081/DVP/API/6.0/FileService/Files',
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
            url: 'http://localhost:8081/DVP/API/6.0/FileService/File/' + file.UniqueId,
            headers: {
                'authorization': '1#1'
            }
        }).then(function (response) {
            return response.data.IsSuccess;
        });
    };


    return {

        DownloadFile: downloadFile,
        GetFiles: getFiles,
        DeleteFile: deleteFile,
        UploadUrl : "http://localhost:8081/DVP/API/6.0/FileService/File/Upload",
        File: {}


    }

});
