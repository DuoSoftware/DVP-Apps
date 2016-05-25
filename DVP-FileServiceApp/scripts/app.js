var app = angular.module("FileManageApp", ["ngMaterial","ngVideo", "md.data.table", "ngRoute", "ngMessages","ngAnimate","ngTable", "fileServiceModule","angularFileUpload","download"]);

app.constant('baseUrl', 'http://fileservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/FileService/');

app.config(function ($routeProvider) {

  $routeProvider.when("/file/list", {
    templateUrl: 'partials/fileList.html',
    controller: 'FileListController'
  })
    .when("/file/create", {
      templateUrl: 'partials/FileAdd.html',
      controller: 'FileEditController'

    })
    .otherwise({
      templateUrl: 'partials/fileList.html',
      controller: 'FileListController'
    });

});
