var app = angular.module("FileManageApp", ["ngMaterial", "md.data.table", "ngRoute", "ngMessages","ngAnimate", "fileServiceModule","angularFileUpload","download"]);

app.config(function ($routeProvider) {

  $routeProvider.when("/file/list", {
    templateUrl: 'partials/fileList.html',
    controller: 'FileListController'
  })
    .when("/file/create", {
      templateUrl: 'partials/fileAdd.html',
      controller: 'FileEditController'

    })
    .otherwise({
      templateUrl: 'partials/fileList.html',
      controller: 'FileListController'
    });

});
