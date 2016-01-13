var app = angular.module("NetworkManageApp", ["ngMaterial", "md.data.table", "ngRoute", "ngMessages", "networkServiceModule"]);

app.config(function ($routeProvider) {

  $routeProvider.when("/networks/list", {

    templateUrl: 'partials/networkList.html',
    controller: 'NetworkListController'

  }).when("/network/create", {


    templateUrl: 'partials/networkAdd.html',
    controller: 'NetworkEditController'


  }).when("/network/:id/edit", {


    templateUrl: 'partials/networkEdit.html',
    controller: 'NetworkEditController'


  }).otherwise({
      templateUrl: 'partials/networkList.html',
      controller: 'NetworkListController'
    });

});
