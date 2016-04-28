var app = angular.module("EngagementApp", ["ngMaterial", "md.data.table", "ngRoute", "ngMessages","ngAnimate","ngTable", "fileServiceModule","angularFileUpload","download"]);

app.config(function ($routeProvider) {

  $routeProvider.when("/file/list", {
    templateUrl: 'partials/fileList.html'

  })
    .when("/file/create", {
      templateUrl: 'partials/AddEngagement.html',
      controller: 'FileEditController'

    })
    .otherwise({
      templateUrl: 'partials/fileList.html',
      controller: 'FileListController'
    });

});
