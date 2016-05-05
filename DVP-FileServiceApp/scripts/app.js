var app = angular.module("FileManageApp", ["ngMaterial", "md.data.table", "ngRoute", "ngMessages","ngAnimate","ngTable", "fileServiceModule","angularFileUpload","download"]);

app.config(function ($routeProvider) {

  $routeProvider.when("/file/list", {
    templateUrl: 'partials/engagementList.html',

  })
    .when("/file/create", {
      templateUrl: 'partials/AddEngagement.html',
      controller: 'FileEditController'

    })
    .otherwise({
      templateUrl: 'partials/engagementList.html',
      controller: 'FileListController'
    });

});
