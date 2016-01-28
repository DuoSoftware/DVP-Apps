var app = angular.module("FileManageApp", ["ngMaterial", "md.data.table", "ngRoute", "ngMessages","ngAnimate","ngTable", "fileServiceModule","angularFileUpload","download"]);

app.config(function ($routeProvider) {

  $routeProvider.when("/file/list", {
    templateUrl: 'partials/fileList.html',
    controller: 'FileListController'
  })
    /*.when("/file/create", {
      templateUrl: 'partials/fileAdd.html',
      controller: 'FileEditController'

    })*/
    .when("/file/create", {
      templateUrl: 'partials/ListTest.html',
      controller: 'demoController'

    })
    .otherwise({
      templateUrl: 'partials/fileList.html',
      controller: 'FileListController'
    });

});
