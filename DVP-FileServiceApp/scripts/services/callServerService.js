/**
 * Created by Rajinda on 12/31/2015.
 */

var fileModule = angular.module("fileServiceModule", []);

fileModule.factory("clusterService", function ($http, $log) {

    var createFile = function (file) {
        var fd = new FormData();
        fd.append('file', file);

        return $http({
            method: 'post',
            url: 'http://localhost:8081/DVP/API/6.0/FileService/File/Upload',
            transformRequest: angular.identity,
            headers: {
                'authorization': '1#1',
              'Content-Type': undefined
            },
            data: fd
        }).then(function (response) {
            return response.data.IsSuccess;
        });
    };

 /* var createFile1 = function(file){

        var fd = new FormData();
        fd.append('file', file);

        $http.post('http://192.168.0.88:8081/DVP/API/6.0/FileService/File/Upload', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })

            .success(function(response){
                return response.data.IsSuccess;
            })

            .error(function(){
            });
    };*/

    var downloadFile = function (id) {


        return $http.get("http://localhost:8081/DVP/API/6.0/FileService/File/Download/"+id).then(function (response) {

            if (response.data && response.data.IsSuccess) {

                return response.data.Result;


            } else {

                return false;
            }


        });
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

    var deleteFile = function (id) {
        return $http({
            method: 'delete',
            url: 'http://localhost:3636/DVP/API/6.0/CloudConfiguration/IPAddress/' + ip.id,
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
        CreateFile: createFile,
        DeleteFile: deleteFile,
        File: {}


    }

});
