var app = angular.module("FileManageApp", ["ngMaterial", "md.data.table", "ngRoute", "ngMessages","ngAnimate", "fileServiceModule","angularFileUpload"]);

app.config(function ($routeProvider) {

  $routeProvider.when("/file/list", {
    templateUrl: 'partials/fileList.html',
    controller: 'FileListController'
  })
    .when("/file/create", {
      templateUrl: 'partials/fileAdd.html',
      controller: 'AppController'

    })
    .when("/file/:id/edit", {
      templateUrl: 'partials/callEdit.html',
      controller: 'CallEditController'
    })
    .otherwise({
      templateUrl: 'partials/fileList.html',
      controller: 'FileListController'
    });

});
