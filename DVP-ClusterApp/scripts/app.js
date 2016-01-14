var app = angular.module("ClusterManageApp", ["ngMaterial", "md.data.table", "ngRoute", "ngMessages", "clusterServiceModule","networkServiceModule"]);

app.config(function ($routeProvider) {

  $routeProvider.when("/clusters/list", {

    templateUrl: 'partials/clusterList.html',
    controller: 'ClusterListController'

  }).when("/cluster/create", {


    templateUrl: 'partials/clusterAdd.html',
    controller: 'ClusterEditController'


  }).when("/cluster/:id/edit", {


    templateUrl: 'partials/clusterEdit.html',
    controller: 'ClusterEditController'


  }).when("/clusterConfigure/:id/edit", {


    templateUrl: 'partials/clusterConfig.html',
    controller: 'ClusterEditController'


  }).when("/cluster/:id/view", {


    templateUrl: 'partials/clusterView.html',
    controller: 'ClusterViewController'


  }).when("/cluster/config", {

    templateUrl: 'partials/clusterConfig.html',
    controller: 'CustomInputDemoCtrl'

  }).when("/cluster/configlist", {

    templateUrl: 'partials/clusterConfigList.html',
    controller: 'ClusterListController'

  }).when("/network/list", {
    templateUrl: 'partials/network/networkList.html',
    controller: 'NetworkListController'
  }).when("/network/create", {
    templateUrl: 'partials/network/networkAdd.html',
    controller: 'NetworkEditController'
  }).when("/network/:id/edit", {
    templateUrl: 'partials/network/networkEdit.html',
    controller: 'NetworkEditController'
  }).otherwise({
      templateUrl: 'partials/clusterList.html',
      controller: 'ClusterListController'
    });

});
