var app = angular.module("ClusterManageApp", ["ngMaterial", "md.data.table", "ngRoute", "ngMessages","ngAnimate", "clusterServiceModule"]);

app.config(function ($routeProvider) {

  $routeProvider.when("/callserver/list", {
    templateUrl: 'partials/callList.html',
    controller: 'CallListController'
  })
    .when("/callserver/create", {
      templateUrl: 'partials/callAdd.html',
      controller: 'CallEditController'

    })
    .when("/callserver/:id/edit", {
      templateUrl: 'partials/callEdit.html',
      controller: 'CallEditController'
    })
    .when("/profile/list", {
      templateUrl: 'partials/profile/profileList.html',
      controller: 'ProfileListController'
    })
    .when("/profile/create", {
      templateUrl: 'partials/profile/profileAdd.html',
      controller: 'ProfileEditController'
    })
    .when("/profile/:id/edit", {
      templateUrl: 'partials/profile/profileEdit.html',
      controller: 'ProfileEditController'
    }).otherwise({
      templateUrl: 'partials/callList.html',
      controller: 'CallListController'
    });

});
