var app = angular.module("ClusterManageApp", ["ngMaterial", "md.data.table", "ngRoute", "ngMessages", "clusterServiceModule"]);

app.config(function ($routeProvider) {

  $routeProvider.when("/callserver/list", {
    templateUrl: 'partials/callList.html',
    controller: 'CallListController'
  }).
    when("/callserver/create", {
      templateUrl: 'partials/callAdd.html',
      controller: 'CallEditController'

    }).when("/callserver/:id/edit", {
      templateUrl: 'partials/callEdit.html',
      controller: 'CallEditController'
    }).otherwise({
      templateUrl: 'partials/callList.html',
      controller: 'CallListController'
    });

});
